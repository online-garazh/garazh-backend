import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { RequestWithUser } from "../users/users.controller";
import { createCarDto } from "./dto/create-car.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UsersService } from "../users/users.service";
import { CarsService } from "./cars.service";
import { JwtAuthGuard } from "../auth/auth.guard";

@ApiTags("Cars")
@Controller("cars")
export class CarsController {
  @Inject(CarsService)
  private readonly carsService: CarsService;

  @Post("/create-car")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({
    description: "create car",
  })
  createCar(@Req() req: RequestWithUser, @Body() body: createCarDto) {
    return this.carsService.createCar(body);
  }

  @Post("/car-image-upload")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FileInterceptor("file"))
  async uploadCarImage(@UploadedFile() file: Express.Multer.File) {
    return await this.carsService.uploadCarImage(file);
  }
}
