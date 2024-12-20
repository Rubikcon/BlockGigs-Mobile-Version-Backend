import { Controller, Get, Body, Post, Delete, Query } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectDTO } from "./project.dto";
import { Param } from "@nestjs/common";
import { Project } from "./project.entity";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects(): Promise<Project[]> {
    return this.projectsService.getProjects();
  }

  @Get("/:projectId")
  async getProject(@Param("projectId") projectId: number): Promise<Project> {
    return this.projectsService.getProject(projectId);
  }

  @Post()
  async createProject(@Body() projectDto: CreateProjectDTO): Promise<Project> {
    return this.projectsService.createProject(projectDto);
  }

  @Post(":projectId/assign/:userId")
  async assignUserToProject(
    @Param("projectId") projectId: number,
    @Param("userId") userId: number
  ) {
    this.projectsService.assign(projectId, userId);
  }

  @Get("/user/:userId")
  async fetchProjectsByUser(
    @Param("userId") userId: number
  ): Promise<Project[]> {
    return this.projectsService.fetchProjectsByUser(userId);
  }

  @Delete("/:projectId")
  async deleteProject(@Param("projectId") projectId: number) {
    await this.projectsService.deleteProject(projectId);
  }
}
