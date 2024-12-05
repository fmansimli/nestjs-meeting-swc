import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { MeetingsService } from "./meetings.service";

import type { CreateMeetingDto } from "./dto/create-meeting.dto";
import type { UpdateMeetingDto } from "./dto/update-meeting.dto";
import type { UserPayload } from "../../types";

import { UseUser } from "../../decorators/use-user.decorator";
import { UseJwtGuard } from "../../decorators/auth.decorator";

@Controller("meetings")
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  @UseJwtGuard()
  async create(@Body() body: CreateMeetingDto, @UseUser() user: UserPayload) {
    return this.meetingsService.create(user.id, body);
  }

  @Get()
  findAll() {
    return this.meetingsService.findAll();
  }

  @Get("me")
  @UseJwtGuard()
  findMyMeetings(@UseUser() user: UserPayload) {
    return this.meetingsService.findMeetingsByHost(user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.meetingsService.findOne(id);
  }

  @Get(":id/attendees")
  findAttendeesByMeeting(@Param("id") id: number) {
    return this.meetingsService.findAttendeesByMeeting(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() body: UpdateMeetingDto) {
    return this.meetingsService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.meetingsService.remove(id);
  }
}
