import { Module } from "@nestjs/common";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./project.entity";
import { ProjectMilestonesService } from "src/project-milestones/project-milestones.service";
import { ProjectMilestone } from "src/project-milestones/project-milestone.entity";
import { UserService } from "src/users/users.service";
import { User } from "src/users/user.entity";

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectMilestonesService, UserService],
  imports: [
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([ProjectMilestone]),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [TypeOrmModule],
})
export class ProjectsModule {}
