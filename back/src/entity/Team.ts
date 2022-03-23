import { IsNotEmpty, validateOrReject } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import bcrypt from "bcrypt";

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
