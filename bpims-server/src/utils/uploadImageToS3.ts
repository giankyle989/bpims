import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/aws";

export const uploadImageToS3 = async (
  file: Express.Multer.File
): Promise<string> => {
  const key = `uploads/${Date.now()}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3.send(command);

  return `${key}`;
};
