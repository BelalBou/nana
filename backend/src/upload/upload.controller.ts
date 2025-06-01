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
  HttpCode,
  Get
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { memoryStorage } from 'multer';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('test')
  testUpload() {
    return { 
      success: true, 
      message: 'Upload module is working',
      timestamp: new Date().toISOString()
    };
  }

  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
      },
      fileFilter: (req, file, cb) => {
        console.log('📁 Fichier reçu:', file.originalname, file.mimetype);
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Seuls les fichiers image sont autorisés'), false);
        }
      },
    })
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log('🔄 Upload demandé, fichier reçu:', !!file);
    
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni');
    }

    try {
      console.log('⬆️ Début upload vers MinIO...');
      const result = await this.uploadService.uploadImage(file);
      console.log('✅ Upload réussi:', result.imageUrl);
      
      return {
        success: true,
        ...result,
      };
    } catch (error) {
      console.error('❌ Erreur upload:', error);
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
