import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class WaitlistCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  companyName: String;

  @Column({ nullable: false })
  email: String;

  @Column({
    nullable: true,
    type: "text",
    transformer: {
      to: (value: string[]): string => value.join(","),
      from: (value: string): string[] => value.split(","),
    },
  })
  talentNeeded: String[];

  @Column({ nullable: false })
  nPositions: number;

  @Column({ nullable: false })
  jobType: String;

  @Column({ nullable: false })
  companyUrl: String;

  @Column({
    nullable: true,
    type: "text",
    transformer: {
      to: (value: string[]): string => value.join(","),
      from: (value: string): string[] => value.split(","),
    },
  })
  paymentOptions: String[];
}
