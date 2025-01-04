import { ApiProperty } from '@nestjs/swagger';
import { Jenis_kelamin } from '@prisma/client';
import { IsString, IsNotEmpty, Length, IsEnum } from 'class-validator';

export class CreateMahasiswaDto {
  @ApiProperty({
    description: 'NIM mahasiswa',
    type: String,
    example: '105841105822',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 12)
  nim: string;

  @ApiProperty({
    description: 'Nama mahasiswa',
    type: String,
    example: 'Muh. Ilham Akbar',
  })
  @IsString()
  @IsNotEmpty()
  nama: string;

  @ApiProperty({
    description: 'Kelas mahasiswa',
    type: String,
    example: '5B',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 12)
  kelas: string;

  @ApiProperty({
    description: 'Jurusan mahasiswa',
    type: String,
    example: 'Teknik Informatika',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 15)
  jurusan: string;

  @ApiProperty({
    description: 'Jenis Kelamin mahasiswa',
    enum: Jenis_kelamin,
    example: 'L',
  })
  @IsEnum(Jenis_kelamin)
  jenis_kelamin: Jenis_kelamin;
}
