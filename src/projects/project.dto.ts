import { ProjectMilestoneCreateDTO } from "src/project-milestones/project-milestone-create.dto";

export class CreateProjectDTO {
  id?: number;
  title: string;
  description: string;
  requiredSkills: string[];
  budget: number;
  deadline: number;
  clientId: number;
  postedBy: string;
  projectMilestones: ProjectMilestoneCreateDTO[];
}
