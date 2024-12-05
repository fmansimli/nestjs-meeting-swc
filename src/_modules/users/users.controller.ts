import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get()
  async findAll() {
    const [users, count] = await this.usersService.findAll();
    return { users, count };
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.usersService.findById(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.usersService.remove(id);
  }
}
