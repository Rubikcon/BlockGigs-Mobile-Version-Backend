import { Module } from "@nestjs/common";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./project.entity";
import { ProjectMilestonesService } from "src/project-milestones/project-milestones.service";
import { ProjectMilestone } from "src/project-milestones/project-milestone.entity";
import { UserService } from "src/users/users.service";
import { User } from "src/users/user.entity";
import { UsersModule } from "src/users/users.module";
import { ProjectMilestonesModule } from "src/project-milestones/project-milestones.module";
import { forwardRef } from "@nestjs/common";
@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectMilestonesService],
  imports: [
    TypeOrmModule.forFeature([Project]),
    forwardRef(() => ProjectMilestonesModule),
    UsersModule,
  ],
  exports: [TypeOrmModule, ProjectsService],
})
export class ProjectsModule {}
