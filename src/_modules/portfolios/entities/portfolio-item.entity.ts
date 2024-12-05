import { Entity, Column, ManyToOne, Relation } from "typeorm";

import { AppEntity } from "../../../entities/app.entity";
import { PortfolioSection } from "./portfolio-section.entity";

@Entity()
export class PortfolioItem extends AppEntity {
  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public visibility: boolean;

  @Column()
  public sectionId: number;

  @ManyToOne(() => PortfolioSection, (section) => section.items)
  public section: Relation<PortfolioSection>;
}
