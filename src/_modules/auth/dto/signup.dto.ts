import {
  IsEmail,
  IsNumber,
  IsString,
  IsStrongPassword,
  Max,
  MaxLength,
  Min,
  MinLength
} from "class-validator";

export class SignUpDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public lastName: string;

  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsNumber()
  public professionId: number;

  @IsEmail()
  public email: string;

  @IsStrongPassword()
  public password: string;
}
