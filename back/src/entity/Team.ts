import bcrypt from "bcrypt";
import { IsNotEmpty, validateOrReject } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task";
import { TeamSolvedTasks } from "./TeamSolvedTasks";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty({ message: "Поле name обязательно" })
  name: string;

  @Column({ select: false })
  @IsNotEmpty({ message: "Поле password обязательно" })
  password: string;

  @OneToMany(() => TeamSolvedTasks, (teamSolvedTasks) => teamSolvedTasks.team)
  public teamSolvedTasks!: TeamSolvedTasks[];

  @ManyToMany(() => Task)
  @JoinTable({ name: "team_solved_tasks" })
  solvedTasks: Task[];

  auth(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async validate() {
    await validateOrReject(this);
  }

  @BeforeInsert()
  @BeforeUpdate()
  private hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  }
}
