import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import prisma from './prisma';
import { UpdateMahasiswaDTO } from './dto/update-mahasiswa.dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { hashSync, compareSync } from 'bcrypt';
import { loginUserDTO } from './dto/login-user.dto';

@Injectable()
export class AppService {
  async login(data: loginUserDTO) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: data.username,
        },
      });
      if (user == null)
        throw new BadRequestException('Username atau Password Salah');
      if (!compareSync(data.password, user.password))
        throw new BadRequestException('Username atau Password Salah');
      return user;
    } catch (error) {
      throw new InternalServerErrorException('ada masalah pada server');
    }
  }

  async register(data: RegisterUserDTO) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: data.username,
        },
      });
      if (user != null)
        throw new BadRequestException('Username ini Sudah Digunakan');
      const newUser = await prisma.user.create({
        data: {
          username: data.username,
          password: hashSync(data.password, 10),
          role: 'USER',
        },
      });
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException('ada masalah pada server');
    }
  }

  async getMahasiswa() {
    return await prisma.mahasiswa.findMany();
  }

  async getMahasiswaByNIM(nim: string) {
    const mahasiswa = await prisma.mahasiswa.findFirst({
      where: {
        nim,
      },
    });

    if (mahasiswa == null) throw new NotFoundException('Tidak Menemukan NIM');

    return mahasiswa;
  }

  async addMahasiswa(data: CreateMahasiswaDto) {
    await prisma.mahasiswa.create({
      data,
    });

    return await prisma.mahasiswa.findMany();
  }

  async deleteMahasiswa(nim: string) {
    const mahasiswa = await prisma.mahasiswa.findFirst({
      where: {
        nim,
      },
    });

    if (mahasiswa == null) {
      throw new NotFoundException('Tidak Menemukan NIM');
    }

    await prisma.mahasiswa.delete({
      where: {
        nim,
      },
    });

    return await prisma.mahasiswa.findMany();
  }

  async updateMahasiswa(nim: string, data: UpdateMahasiswaDTO) {
    const mahasiswa = await prisma.mahasiswa.findFirst({
      where: {
        nim,
      },
    });

    if (mahasiswa == null) {
      throw new NotFoundException('Tidak Menemukan NIM');
    }

    await prisma.mahasiswa.update({
      where: {
        nim,
      },
      data: data,
    });

    return await prisma.mahasiswa.findMany();
  }
}
