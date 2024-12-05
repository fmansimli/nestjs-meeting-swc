import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";

import { Password } from "../../utils/password";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async create(attrs: CreateUserDto): Promise<User> {
    attrs.password = await Password.toHash(attrs.password);
    const user = this.userRepo.create(attrs);

    return this.userRepo.save(user);
  }

  async register(attrs: RegisterUserDto) {
    attrs.password = await Password.toHash(attrs.password);
    const user = this.userRepo.create(attrs);

    return this.userRepo.save(user);
  }

  async save(user: User): Promise<User> {
    return this.userRepo.save(user);
  }

  async findAll(): Promise<[User[], number]> {
    return this.userRepo.findAndCount();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async update(id: number, attrs: UpdateUserDto) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    Object.assign(user, attrs);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return this.userRepo.softRemove(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { email },
      relations: { roles: { claims: true } }
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.userRepo.existsBy({ email });
  }

  async getUserProfile(id: number) {
    const user = this.userRepo.findOne({
      where: { id },
      relations: {
        profession: true,
        skills: true
      }
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
