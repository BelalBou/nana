import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 's3.dayz-code.com',
  port: parseInt(process.env.MINIO_PORT || '443'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'one',
  secretKey: process.env.MINIO_SECRET_KEY || 'skylineGTR48',
});

const BUCKET_NAME = 'immoaide-images';

// Créer le bucket s'il n'existe pas
export const initializeBucket = async () => {
  try {
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    if (!exists) {
      await minioClient.makeBucket(BUCKET_NAME, 'us-east-1');
      console.log('✅ Bucket MinIO créé avec succès');
      
      // Rendre le bucket public pour les images
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { AWS: ['*'] },
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
          },
        ],
      };
      
      await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
      console.log('✅ Politique du bucket configurée (public read)');
    } else {
      console.log('✅ Bucket MinIO déjà existant');
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation du bucket MinIO:', error);
  }
};

export { minioClient, BUCKET_NAME };
