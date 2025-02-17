import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth.guards';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDecorator } from 'src/user.decorator';
import { User } from '@prisma/client';
import { Response } from 'express';
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor(`file`))
  uploadFile(@UploadedFile() file :Express.Multer.File, 
  @UserDecorator()user : User) {
    if (file == null) throw new BadRequestException("File Tidak Boleh Kosong")

      return this.profileService.uploadFile(file, user.id)
  }
  @Get("/:id")
  async getProfile(@Param("id") id: number, @Res() res : Response ){
    const filename = await this.profileService.sendMyFotoProfile(id);
    return res.sendFile(`../../uploads/`+filename)
  }
}

  
