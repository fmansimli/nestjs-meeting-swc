import { Entity, PrimaryColumn, Column, ManyToOne, Relation } from "typeorm";

import { User } from "../../users/entities/user.entity";
import { Meeting } from "../../meetings/entities/meeting.entity";

@Entity()
export class Rating {
  @PrimaryColumn()
  public userId: number;

  @PrimaryColumn()
  public meetingId: number;

  @Column()
  public score: number;

  @Column()
  public comment: string;

  @ManyToOne(() => User, (user) => user.ratings)
  public user: Relation<User>;

  @ManyToOne(() => Meeting, (meeting) => meeting.ratings)
  public meeting: Relation<Meeting>;
}
