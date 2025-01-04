import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDTO } from './dto/update-mahasiswa.dto';
import { get } from 'http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('Mahasiswa')
  @ApiBody({ type: CreateMahasiswaDto })
  createMahasiswa(@Body() data: CreateMahasiswaDto) {
    return this.appService.addMahasiswa(data);
  }

  @Delete('Mahasiswa/:nim')
  deleteMahasiswa(@Param('nim') nim: string) {
    return this.appService.deleteMahasiswa(nim);
  }

  // @Put('Mahasiswa/:nim')
  // @ApiBody({ type: UpdateMahasiswaDTO })
  // editMahasiswa(@Body() { nama }: UpdateMahasiswaDTO) {
  //   return this.appService.updateMahasiswa(nama);
  // }
  @Put('Mahasiswa/:nim')
  @ApiBody({ type: UpdateMahasiswaDTO })
  editMahasiswa(
    @Param('nim') nim: string,
    @Body() data: UpdateMahasiswaDTO,
  ) {
    return this.appService.updateMahasiswa(nim, data);
  }

  @Get('Mahasiswa')
  getMahasiswa() {
    return this.appService.getMahasiswa();
  }
  @Get('Mahasiswa/:nim')
  getMahasiswaByNim(@Param('nim') nim: string) {
    return this.appService.getMahasiswaByNIM(nim);
  }
}
