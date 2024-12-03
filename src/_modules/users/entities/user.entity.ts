import { Column, Entity, ManyToMany, ManyToOne, OneToMany, Relation } from "typeorm";
import { AppEntity } from "../../../entities/app.entity";
import { Meeting } from "../../meetings/entities/meeting.entity";
import { Payment } from "../../payments/entities/payment.entity";
import { Profession } from "../../professions/entities/profession.entity";
import { Skill } from "../../skills/entities/skill.entity";

@Entity()
export class User extends AppEntity {
  @Column({ length: 50 })
  public firstName: string;

  @Column({ length: 50 })
  public lastName: string;

  @Column({ length: 50 })
  public email: string;

  @Column()
  public emailConfirmed: boolean;

  @Column({ length: 50 })
  public phoneNumber: string;

  @Column({ nullable: true })
  public avatar: string;

  @Column({ length: 50, nullable: true })
  public refTokenId: string;

  @Column({ nullable: true })
  public agoraToken: string;

  @Column()
  public professionId: number;

  @ManyToMany(() => Meeting, (meeting) => meeting.hosts)
  public meetings: Relation<Meeting[]>;

  @ManyToMany(() => Meeting, (lesson) => lesson.users)
  public lessons: Relation<Meeting[]>;

  @OneToMany(() => Payment, (payment) => payment.user)
  public payments: Relation<Payment[]>;

  @ManyToOne(() => Profession, (profession) => profession.users)
  public profession: Relation<Profession>;

  @ManyToMany(() => Skill, (skill) => skill.users)
  public skills: Relation<Skill[]>;
}
