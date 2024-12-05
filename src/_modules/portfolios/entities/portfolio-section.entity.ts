import { Entity, Column, ManyToOne, OneToMany, Relation } from "typeorm";

import { AppEntity } from "../../../entities/app.entity";
import { Portfolio } from "./portfolio.entity";
import { PortfolioItem } from "./portfolio-item.entity";

@Entity()
export class PortfolioSection extends AppEntity {
  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public visibility: boolean;

  @Column()
  public portfolioId: number;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.sections)
  public portfolio: Relation<Portfolio>;

  @OneToMany(() => PortfolioItem, (item) => item.section)
  public items: Relation<PortfolioItem[]>;
}
