import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import prisma from './prisma';
import { UpdateMahasiswaDTO } from './dto/update-mahasiswa.dto';

@Injectable()
export class AppService {
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

  async updateMahasiswa(nim: string, data : UpdateMahasiswaDTO) {
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
      data: data
      
    });

    return await prisma.mahasiswa.findMany();
  }
}
