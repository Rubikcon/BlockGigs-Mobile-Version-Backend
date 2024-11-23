import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateProjectDTO } from "./project.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "./project.entity";
import { UserService } from "src/users/users.service";
import { ProjectMilestonesService } from "src/project-milestones/project-milestones.service";

@Injectable()
export class ProjectsService {
  constructor(
    private projectMilestoneService: ProjectMilestonesService,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private userService: UserService
  ) {}

  async getProjects(): Promise<Project[]> {
    return await this.projectsRepository.find({
      relations: ["projectMilestones"],
    });
  }

  async createProject(project: CreateProjectDTO): Promise<Project> {
    if (project.projectMilestones.length === 0) {
      throw new BadRequestException("Must have at least one milestone");
    }
    const projectSaved = await this.projectsRepository.save({
      ...project,
      assignedUserId: null,
    });
    await this.projectMilestoneService.createMilestonesForProject(
      projectSaved,
      project.projectMilestones
    );

    return await this.getProject(projectSaved.id);
  }

  async getProject(projectId: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
      relations: ["projectMilestones"],
    });

    if (project === null) {
      throw new NotFoundException("Invalid projectId");
    }

    return project;
  }

  async assign(projectId: number, userId: number) {
    const project = await this.getProject(projectId);

    // throws if invalid user
    this.userService.getUser(userId);

    project.assignedUserId = userId;

    this.projectsRepository.save(project);
  }

  async fetchProjectsByUser(userId: number) {
    const projects = await this.projectsRepository.find({
      where: { assignedUserId: userId },
      relations: ["projectMilestones"],
    });

    return projects;
  }

  async deleteProject(projectId: number) {
    await this.projectMilestoneService.deleteMilestones(projectId);
    return await this.projectsRepository.delete({ id: projectId });
  }
}
