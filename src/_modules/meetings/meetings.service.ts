import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMeetingDto } from "./dto/create-meeting.dto";
import { UpdateMeetingDto } from "./dto/update-meeting.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Meeting } from "./entities/meeting.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class MeetingsService {
  constructor(@InjectRepository(Meeting) private readonly repo: Repository<Meeting>) {}

  async create(userId: number, attrs: CreateMeetingDto) {
    const meeting = this.repo.create(attrs);

    const user = new User();
    user.id = userId;

    meeting.hosts = [user];
    return this.repo.save(meeting);
  }

  async findAll() {
    const meetings = this.repo.find({
      where: {},
      relations: { hosts: true }
    });

    return meetings;
  }

  async findMeetingsByHost(hostId: number) {
    const meetings = await this.repo
      .createQueryBuilder("meeting")
      .leftJoin("meeting.hosts", "user")
      .where("user.id=:hostId", { hostId })
      .select(["meeting.id", "meeting.title"])
      .addSelect(["user.id", "user.email"])
      .getMany();

    return meetings;
  }

  async findAttendeesByMeeting(id: number) {
    const meeting = await this.repo.findOne({
      where: { id },
      relations: {
        users: true
      }
    });

    return meeting.users;
  }

  async findOne(id: number) {
    const meeting = await this.repo.findOne({
      where: { id },
      relations: {
        hosts: true,
        skills: true
      }
    });

    if (!meeting) {
      throw new NotFoundException("meeting not found");
    }

    return meeting;
  }

  async update(id: number, attrs: UpdateMeetingDto) {
    const meeting = await this.repo.findOne({ where: { id } });

    if (!meeting) {
      throw new NotFoundException("meeting not found");
    }

    Object.assign(meeting, attrs);
    return this.repo.save(meeting);
  }

  async remove(id: number) {
    const meeting = await this.repo.findOne({ where: { id } });

    if (!meeting) {
      throw new NotFoundException("meeting not found");
    }
    return this.repo.softRemove(meeting);
  }
}
