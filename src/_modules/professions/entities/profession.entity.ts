import { Entity, Column, OneToMany, Relation } from "typeorm";

import { AppEntity } from "../../../entities/app.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Profession extends AppEntity {
  @Column()
  public title: string;

  @Column()
  public description: string;

  @OneToMany(() => User, (user) => user.profession)
  public users: Relation<User[]>;
}
