import { Entity, Column, ManyToMany, Relation, JoinTable } from "typeorm";

import { AppEntity } from "../../../entities/app.entity";
import { Meeting } from "../../meetings/entities/meeting.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Skill extends AppEntity {
  @Column({ length: 50 })
  public name: string;

  @Column()
  public description: string;

  @JoinTable()
  @ManyToMany(() => User, (user) => user.skills)
  public users: Relation<User[]>;

  @JoinTable()
  @ManyToMany(() => Meeting, (meeting) => meeting.skills)
  public meetings: Relation<Meeting[]>;
}
