import {
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Task } from "./Task";
import { Team } from "./Team";

@Entity()
export class TeamSolvedTasks {
  @PrimaryColumn()
  public teamId!: number;

  @PrimaryColumn()
  public taskId!: number;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @OneToOne(() => Team)
  @JoinTable()
  public team!: Team;

  @OneToOne(() => Task)
  @JoinTable()
  public task!: Task;
}
