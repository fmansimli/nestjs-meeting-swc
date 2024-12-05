import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Profession } from "./entities/profession.entity";
import { CreateProfessionDto } from "./dto/create-profession.dto";
import { UpdateProfessionDto } from "./dto/update-profession.dto";

@Injectable()
export class ProfessionsService {
  constructor(@InjectRepository(Profession) private readonly repo: Repository<Profession>) {}

  async create(attrs: CreateProfessionDto) {
    const profession = this.repo.create(attrs);
    return this.repo.save(profession);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const profession = await this.repo.findOneBy({ id });

    if (!profession) {
      throw new NotFoundException("Profession not found");
    }

    return profession;
  }

  async update(id: number, attrs: UpdateProfessionDto) {
    const profession = await this.findOne(id);

    if (!profession) {
      throw new NotFoundException("Profession not found");
    }

    Object.assign(profession, attrs);
    return this.repo.save(profession);
  }

  async remove(id: number) {
    const profession = await this.findOne(id);

    if (!profession) {
      throw new NotFoundException("Profession not found");
    }

    return this.repo.softRemove(profession);
  }
}
