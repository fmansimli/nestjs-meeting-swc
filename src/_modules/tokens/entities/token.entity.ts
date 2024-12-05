import { Entity, PrimaryColumn, Column, ManyToOne, Relation } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Meeting } from "../../meetings/entities/meeting.entity";

@Entity()
export class Token {
  @PrimaryColumn()
  public userId: number;

  @PrimaryColumn()
  public meetingId: number;

  @Column()
  public token: string;

  @ManyToOne(() => User, (user) => user.tokens)
  public user: Relation<User>;

  @ManyToOne(() => Meeting, (meeting) => meeting.tokens)
  public meeting: Relation<Meeting>;
}
