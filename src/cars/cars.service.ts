import { Inject, Injectable } from "@nestjs/common";
import { S3Service } from "../services/s3.service";
import { TemporaryFilesService } from "../temporary-files/temporary-file.service";
import { InjectRepository } from "@nestjs/typeorm";
import { TemporaryFileEntity } from "../temporary-files/temp-images.entity";
import { Repository } from "typeorm";
import { createCarDto } from "./dto/create-car.dto";
import { UserEntity } from "../users/user.entity";
import { CarEntity } from "./car.entity";

@Injectable()
export class CarsService {
  @Inject(S3Service)
  private s3Service: S3Service;

  @Inject(TemporaryFilesService)
  private temporaryFiles: TemporaryFilesService;

  @InjectRepository(CarEntity)
  private readonly repository: Repository<CarEntity>;

  async uploadCarImage(
    file: Express.Multer.File
  ): Promise<{ id: number; url: string }> {
    const bucketName = "garazh";
    console.log("file", file.originalname);

    const fileName = `temporary-car-images/image_${Date.now()}`;

    const uploadImage = async (file: Express.Multer.File) => {
      try {
        return await this.s3Service.uploadFileToS3(file, bucketName, fileName);
      } catch (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
      }
    };

    const imageUrl = await uploadImage(file);

    const imageObject = await this.temporaryFiles.createTemporaryCarImage(
      imageUrl
    );

    return { id: imageObject.id, url: imageObject.url };
  }

  async createCar(body: createCarDto) {
    // const car = await this.repository.save(body);

    const moveImage = async (images: { id: number; url: string }[]) => {
      return images.forEach((image) => {
        const parts = image.url.split("/");
        const fileName = parts[parts.length - 1];

        return this.s3Service.moveImage(fileName);

      });
    };

    try {
      await moveImage(body.images);
      console.log("Изображение успешно перемещено.");

    } catch (error) {
      console.error("Ошибка перемещения изображения:", error);
    }
  }
}
