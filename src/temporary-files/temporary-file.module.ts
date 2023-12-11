import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { TemporaryFilesService } from "./temporary-file.service";
import { TemporaryFileEntity } from "./temp-images.entity";


@Module({
  imports: [TypeOrmModule.forFeature([TemporaryFileEntity])],
  providers: [TemporaryFilesService],
  exports: [TemporaryFilesService],
})
export class TemporaryFileModule {}
