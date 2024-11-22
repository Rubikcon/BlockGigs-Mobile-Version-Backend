import { Injectable, NotFoundException } from "@nestjs/common";
import { ProjectMilestoneStatus } from "./project-milestone.dto";
import { ProjectMilestoneCreateDTO } from "./project-milestone-create.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectMilestone } from "./project-milestone.entity";
import { Project } from "src/projects/project.entity";

@Injectable()
export class ProjectMilestonesService {
  constructor(
    @InjectRepository(ProjectMilestone)
    private projectMilestonesRepository: Repository<ProjectMilestone>
  ) {}

  // async getProjectMilestones(
  //   projectId: number
  // ): Promise<ProjectMilestone[]> {
  //   return this.projectMilestonesRepository.find({
  //     where: { projectId: projectId },
  //   });
  // }

  async createMilestoneForProject(
    project: Project,
    milestone: ProjectMilestoneCreateDTO
  ): Promise<ProjectMilestone> {
    return await this.projectMilestonesRepository.save({
      ...milestone,
      project,
    });
  }

  async createMilestonesForProject(
    project: Project,
    milestones: ProjectMilestoneCreateDTO[]
  ): Promise<ProjectMilestone[]> {
    milestones = milestones.map((milestone) => ({ ...milestone, project }));
    return await this.projectMilestonesRepository.save(milestones);
  }

  async getMilestoneById(
    projectMilestoneId: number
  ): Promise<ProjectMilestone> {
    const projectMilestone = await this.projectMilestonesRepository.findOneBy({
      id: projectMilestoneId,
    });

    if (!projectMilestone) {
      throw new NotFoundException("Milestone does not exist");
    }

    return projectMilestone;
  }

  async updateMilestoneStatus(
    projectMilestoneId: number,
    status: ProjectMilestoneStatus
  ) {
    const projectMilestone = await this.getMilestoneById(projectMilestoneId);

    projectMilestone.status = status;

    this.projectMilestonesRepository.save(projectMilestone);
  }
}
