import { IsBoolean, IsString, MinLength, MaxLength, IsUrl, IsDate, MinDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateMeetingDto {
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  public title: string;

  @IsString()
  @MinLength(20)
  @MaxLength(5000)
  public description: string;

  @IsBoolean()
  public isPaid: boolean;

  @IsUrl()
  public image: string;

  @IsDate()
  @MinDate(() => new Date())
  @Type(() => Date)
  public scheduledAt: Date;
}
