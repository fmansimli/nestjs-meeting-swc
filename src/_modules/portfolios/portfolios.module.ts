import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PortfoliosService } from "./portfolios.service";
import { PortfoliosController } from "./portfolios.controller";

import { Portfolio } from "./entities/portfolio.entity";
import { PortfolioSection } from "./entities/portfolio-section.entity";
import { PortfolioItem } from "./entities/portfolio-item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio, PortfolioSection, PortfolioItem])],
  controllers: [PortfoliosController],
  providers: [PortfoliosService]
})
export class PortfoliosModule {}
