import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsStrongPassword,
  IsEmail,
  MinLength,
  MaxLength
} from "class-validator";

export class CreateUserDto {
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

  @IsStrongPassword()
  public password: string;

  @IsEmail()
  public email: string;
}
