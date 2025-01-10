import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty, Matches } from 'class-validator';

export class loginUserDTO {
  @ApiProperty({
    description: 'Nama user',
    type: String,
    example: 'ilham',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S*$/i)
  @Length(1, 30)
  username: string;       

  @ApiProperty({
    description: 'Password',
    type: String,
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S*$/i)
  @Length(1, 30)
  password: string;
}