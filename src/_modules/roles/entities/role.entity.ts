import { Entity, Column, ManyToMany, JoinTable, Relation } from "typeorm";

import { AppEntity } from "../../../entities/app.entity";
import { User } from "../../users/entities/user.entity";
import { Claim } from "../../claims/entities/claim.entity";

@Entity()
export class Role extends AppEntity {
  @Column()
  public name: string;

  @Column()
  public description: string;

  @JoinTable()
  @ManyToMany(() => User, (user) => user.roles)
  public users: Relation<User[]>;

  @JoinTable()
  @ManyToMany(() => Claim, (claim) => claim.roles)
  public claims: Relation<Claim[]>;
}
