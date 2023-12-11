import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { fromBuffer } from "file-type";
// YFWofEfM6CReOdJ0OCBwr0YBgiuMThdz7PMSsdFr
@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: "AKIATWILRUCW6S6FPXCW",
      secretAccessKey: "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",
      region: "us-east-1",
    });
  }

  async uploadImage(base64Data: string, bucketName: string, fileName: string) {
    const buffer = Buffer.from(base64Data.split(",")[1], "base64");
    const getFormat = async (buffer: Buffer) => {
      try {
        const type = await fromBuffer(buffer);
        return type.ext;
      } catch {
        throw new Error("Wrong data type! Should be a buffer!");
      }
    };

    const format = await getFormat(buffer);

    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: `${fileName}.${format}`,
      Body: buffer,
      ACL: "public-read",
      ContentType: "image/jpeg",
    };

    try {
      const data = await this.s3.upload(params).promise();
      return data.Location;
    } catch (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  async uploadFileToS3(
    file: Express.Multer.File,
    bucketName: string,
    fileName: string
  ) {
    const getFormat = async (buffer: Buffer) => {
      try {
        const type = await fromBuffer(buffer);
        return type.ext;
      } catch {
        throw new Error("Wrong data type! Should be a buffer!");
      }
    };

    const format = await getFormat(file.buffer);

    const params = {
      Bucket: bucketName,
      Key: `cars/${fileName}.${format}`,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: `image/${format}`,
    };

    const responseFile = await this.s3.upload(params).promise();

    return responseFile.Location;
  }

  async moveImage(sourceKey: string): Promise<void> {

    const copyObjectParams = {
      Bucket: "garazh",
      CopySource: `garazh/cars/temporary-car-images/${sourceKey}`,
      Key: `cars/car-images/${sourceKey}`,
      ACL: "public-read",
    };

    await this.s3.copyObject(copyObjectParams).promise();


    const deleteObjectParams = {
      Bucket: "garazh",
      Key: `cars/temporary-car-images/${sourceKey}`,
    };

    await this.s3.deleteObject(deleteObjectParams).promise();

  }
}
