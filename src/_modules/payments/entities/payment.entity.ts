import { Entity, Column, Generated, Relation, ManyToOne } from "typeorm";
import { Meeting } from "../../meetings/entities/meeting.entity";
import { User } from "../../users/entities/user.entity";
import { AppEntity } from "../../../entities/app.entity";

@Entity()
export class Payment extends AppEntity {
  @Column()
  @Generated("uuid")
  public hash: string;

  @Column({ length: 20 })
  public status: string;

  @Column()
  public meetingId: number;

  @Column()
  public userId: number;

  @ManyToOne(() => Meeting, (meeting) => meeting.payments)
  public meeting: Relation<Meeting>;

  @ManyToOne(() => User, (user) => user.payments)
  public user: Relation<User>;
}
