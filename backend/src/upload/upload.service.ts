import { Injectable } from '@nestjs/common';
import { minioClient, BUCKET_NAME } from '../config/minio';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<{ imageUrl: string; fileName: string }> {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      const objectName = `aids/${fileName}`;

      // Upload vers MinIO
      await minioClient.putObject(
        BUCKET_NAME,
        objectName,
        file.buffer,
        file.size,
        {
          'Content-Type': file.mimetype,
        }
      );

      // Générer l'URL publique
      const imageUrl = `https://${process.env.MINIO_ENDPOINT}/${BUCKET_NAME}/${objectName}`;

      return {
        imageUrl,
        fileName: objectName,
      };
    } catch (error) {
      throw new Error(`Erreur lors de l'upload: ${error.message}`);
    }
  }

  async deleteImage(fileName: string): Promise<void> {
    try {
      // Décoder le nom du fichier au cas où il serait encodé
      const decodedFileName = decodeURIComponent(fileName);
      
      // Si le fichier ne contient pas le préfixe aids/, l'ajouter
      const objectName = decodedFileName.startsWith('aids/') 
        ? decodedFileName 
        : `aids/${decodedFileName}`;
        
      await minioClient.removeObject(BUCKET_NAME, objectName);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'image:', error);
      throw new Error(`Erreur lors de la suppression: ${error.message}`);
    }
  }

  async getImageUrl(fileName: string): Promise<string> {
    try {
      return await minioClient.presignedGetObject(BUCKET_NAME, fileName, 24 * 60 * 60); // 24h
    } catch (error) {
      throw new Error(`Erreur lors de la génération de l'URL: ${error.message}`);
    }
  }
}
