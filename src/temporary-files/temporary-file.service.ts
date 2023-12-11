import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TemporaryFileEntity } from "./temp-images.entity";

@Injectable()
export class TemporaryFilesService {
  @InjectRepository(TemporaryFileEntity)
  private readonly repository: Repository<TemporaryFileEntity>;

  async createTemporaryCarImage(
    imageUrl: string
  ): Promise<TemporaryFileEntity> {
    const newFile = this.repository.create({
      url: imageUrl,
    });

    return await this.repository.save(newFile);
  }
}
