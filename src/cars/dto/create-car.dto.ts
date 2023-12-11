import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  isNumber,
  IsString,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class createCarDto {
  @ApiProperty()
  @IsString()
  nickName: string;

  @ApiProperty()
  @IsNumber()
  brandId: number;

  @ApiProperty()
  @IsNumber()
  modelId: number;

  @ApiProperty()
  @IsNumber()
  bodyId: number;

  @ApiProperty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsNumber()
  yearPurchase: number;

  @ApiProperty()
  @IsNumber()
  colorId: number;

  @ApiProperty()
  @IsBoolean()
  isOldCar: boolean;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsArray()
  // @MinLength(1)
  images: {
    id: number;
    url: string;
  }[];

  @ApiProperty()
  @IsNumber()
  engineTypeId: number;

  @ApiProperty()
  @IsNumber()
  engineVolumeId: number;

  @ApiProperty()
  @IsNumber()
  transmissionOptionId: number;

  @ApiProperty()
  @IsNumber()
  wheelDriveOptionId: number;

  @ApiProperty()
  @IsString()
  power: string;

  @ApiProperty()
  @IsString()
  vin: string;

  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsBoolean()
  showAll: boolean;
}
