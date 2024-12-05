import { IsString, MinLength, MaxLength } from "class-validator";

export class CreateProfessionDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  public title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(255)
  public description: string;
}
