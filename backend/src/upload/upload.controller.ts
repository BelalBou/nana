import { 
  Controller, 
  Post, 
  Delete, 
  Param, 
  UploadedFile, 
  UseInterceptors, 
  UseGuards,
  BadRequestException,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { memoryStorage } from 'multer';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Seuls les fichiers image sont autorisés'), false);
        }
      },
    })
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni');
    }

    try {
      const result = await this.uploadService.uploadImage(file);
      return {
        success: true,
        ...result,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('image/:fileName')
  @HttpCode(HttpStatus.OK)
  async deleteImage(@Param('fileName') fileName: string) {
    try {
      await this.uploadService.deleteImage(fileName);
      return { 
        success: true, 
        message: 'Image supprimée avec succès' 
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
