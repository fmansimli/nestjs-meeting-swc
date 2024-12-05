import { Entity, Column, OneToOne, JoinColumn, OneToMany, Relation } from "typeorm";

import { AppEntity } from "../../../entities/app.entity";
import { PortfolioSection } from "./portfolio-section.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Portfolio extends AppEntity {
  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public visibility: boolean;

  @Column()
  public userId: number;

  @JoinColumn()
  @OneToOne(() => User, (user) => user.portfolio)
  public user: Relation<User>;

  @OneToMany(() => PortfolioSection, (section) => section.portfolio)
  public sections: Relation<PortfolioSection[]>;
}
