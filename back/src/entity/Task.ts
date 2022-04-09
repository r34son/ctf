import { Category } from "@/consts";
import bcrypt from "bcrypt";
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  validateOrReject,
} from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TeamSolvedTasks } from "./TeamSolvedTasks";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: "Поле title обязательно" })
  title: string;

  @Column({ type: "enum", enum: Category })
  @IsNotEmpty({ message: "Поле category обязательно" })
  @IsEnum(Category, { message: "Поле category содержит неизвестную категорию" })
  category: Category;

  @Column()
  @IsNotEmpty({ message: "Поле description обязательно" })
  description: string;

  @Column()
  @IsNotEmpty({ message: "Поле points обязательно" })
  @IsPositive({ message: "Поле points должно быть целым положительным числом" })
  points: number;

  @Column({ default: false })
  @IsOptional()
  @IsBoolean({ message: "Поле enabled должно быть boolean" })
  enabled: boolean;

  @Column({ select: false })
  @IsNotEmpty({ message: "Поле flag обязательно" })
  flag: string;

  @OneToMany(() => TeamSolvedTasks, (teamSolvedTasks) => teamSolvedTasks.task)
  public teamSolvedTasks!: TeamSolvedTasks[];

  resolve(flag: string) {
    return bcrypt.compareSync(flag, this.flag);
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async validate() {
    await validateOrReject(this);
  }

  @BeforeInsert()
  @BeforeUpdate()
  private hashFlag() {
    if (this.flag) {
      this.flag = bcrypt.hashSync(this.flag, 8);
    }
  }
}
