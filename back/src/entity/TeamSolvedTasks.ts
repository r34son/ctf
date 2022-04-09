import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
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

  @ManyToOne(() => Team, (team) => team.teamSolvedTasks)
  public team!: Team;

  @ManyToOne(() => Task, (task) => task.teamSolvedTasks)
  public task!: Task;
}
