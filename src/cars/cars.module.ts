import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { CarEntity } from "./car.entity";
import { CarsService } from "./cars.service";
import { CarsController } from "./cars.controller";
import { S3Service } from "../services/s3.service";
import { TemporaryFilesService } from "../temporary-files/temporary-file.service";
import { TemporaryFileEntity } from "../temporary-files/temp-images.entity";


@Module({
  imports: [TypeOrmModule.forFeature([CarEntity, TemporaryFileEntity])],
  providers: [CarsService, S3Service, TemporaryFilesService],
  controllers: [CarsController],
  exports: [CarsService],

})
export class CarsModule {}


