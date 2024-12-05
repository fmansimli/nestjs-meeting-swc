import { Column, Entity, ManyToMany, Relation } from "typeorm";

import { AppEntity } from "../../../entities/app.entity";
import { Role } from "../../roles/entities/role.entity";

@Entity()
export class Claim extends AppEntity {
  @Column({ length: 70 })
  public name: string;

  @Column({ length: 10 })
  public alias: string;

  @Column()
  public description: string;

  @ManyToMany(() => Role, (role) => role.claims)
  public roles: Relation<Role[]>;
}
