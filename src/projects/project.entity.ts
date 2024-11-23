import { ProjectMilestone } from "src/project-milestones/project-milestone.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({
    nullable: true,
    type: "text",
    transformer: {
      to: (value: string[]): string => value.join(","),
      from: (value: string): string[] =>
        value === null ? [] : value.split(","),
    },
  })
  requiredSkills: string[];

  @Column({ nullable: false })
  budget: number;

  @Column({ nullable: false })
  deadline: number;

  @Column({ nullable: false })
  clientId: number;

  @Column({ nullable: true })
  assignedUserId: number | null;

  @OneToMany(() => ProjectMilestone, (milestone) => milestone.project)
  projectMilestones: ProjectMilestone[];
}
