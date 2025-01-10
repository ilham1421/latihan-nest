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
import { RegisterUserDTO } from './dto/register-user.dto';
import { loginUserDTO } from './dto/login-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('Mahasiswa')
  @ApiBody({ type: CreateMahasiswaDto })
  createMahasiswa(@Body() data: CreateMahasiswaDto) {
    return this.appService.addMahasiswa(data);
  }

  @Post('register')
  @ApiBody({ type: RegisterUserDTO })
  register(@Body() data: RegisterUserDTO) {
    return this.appService.register(data);
  }

  @Delete('Mahasiswa/:nim')
  deleteMahasiswa(@Param('nim') nim: string) {
    return this.appService.deleteMahasiswa(nim);
  }

  @Post('login')
  @ApiBody({ type: loginUserDTO })
  login(@Body() data: loginUserDTO) {
    return this.appService.login(data);
  }

  @Put('Mahasiswa/:nim')
  @ApiBody({ type: UpdateMahasiswaDTO })
  editMahasiswa(@Param('nim') nim: string, @Body() data: UpdateMahasiswaDTO) {
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