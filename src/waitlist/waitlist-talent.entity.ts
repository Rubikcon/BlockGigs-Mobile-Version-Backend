import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class WaitlistTalent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: String;

  @Column({ nullable: false })
  email: String;

  @Column({ nullable: false })
  location: String;

  @Column({ nullable: false })
  skills: String;

  @Column({ nullable: false })
  experienceLevel: String;

  @Column({ nullable: false })
  availability: String;

  @Column({ nullable: true })
  preferredIndustry: String;

  @Column({ nullable: false })
  socialsLink: String;
}
