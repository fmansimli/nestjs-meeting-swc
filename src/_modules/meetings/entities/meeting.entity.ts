import { Column, Entity, JoinTable, ManyToMany, OneToMany, Relation } from "typeorm";

import { AppEntity } from "../../../entities/app.entity";
import { Payment } from "../../payments/entities/payment.entity";
import { User } from "../../users/entities/user.entity";
import { Skill } from "../../skills/entities/skill.entity";
import { Rating } from "../../ratings/entities/rating.entity";
import { Token } from "../../tokens/entities/token.entity";

@Entity()
export class Meeting extends AppEntity {
  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column({ nullable: true })
  public image: string;

  @Column()
  public scheduledAt: Date;

  @Column({ default: true })
  public isPaid: boolean;

  @Column({ length: 20 })
  public status: string;

  @JoinTable()
  @ManyToMany(() => User, (host) => host.meetings)
  public hosts: Relation<User[]>;

  @JoinTable()
  @ManyToMany(() => User, (user) => user.lessons)
  public users: Relation<User[]>;

  @OneToMany(() => Payment, (payment) => payment.meeting)
  public payments: Relation<Payment[]>;

  @ManyToMany(() => Skill, (skill) => skill.meetings)
  public skills: Relation<Skill[]>;

  @OneToMany(() => Rating, (rating) => rating.meeting)
  public ratings: Relation<Rating[]>;

  @OneToMany(() => Token, (token) => token.meeting)
  public tokens: Relation<Token[]>;
}
