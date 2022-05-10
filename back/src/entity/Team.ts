import bcrypt from "bcrypt";
import { IsNotEmpty, validateOrReject } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity, OneToMany, PrimaryGeneratedColumn
} from "typeorm";
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

  @OneToMany(() => TeamSolvedTasks, teamSolvedTasks => teamSolvedTasks.team)
  public solved!: TeamSolvedTasks[];

  auth(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async validate() {
    await validateOrReject(this);
  }

  @BeforeInsert()
  private hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
