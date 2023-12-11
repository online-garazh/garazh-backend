import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param, Query
} from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOkResponse } from "@nestjs/swagger";

import {
  All_CITIES_BY_COUNTRY,
  COUNTRIES,
} from "./constants/countries";
import { CAR_BRANDS_LIST } from "./constants/cars";
import { CAR_MODELS_LIST } from "./constants/car-models";
import { carDetails, } from "./constants/car-info";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  //
  // @Get("countries/")
  // @ApiOkResponse()
  // getAllCountries() {
  //   return COUNTRIES;
  // }
  //
  // @Get("carBrandsList")
  // @ApiOkResponse({
  //   description: "Returns the car names list",
  //   schema: {
  //     type: "array",
  //     items: {
  //       type: "object",
  //       properties: {
  //         id: {
  //           type: "number",
  //         },
  //         label: {
  //           type: "string",
  //         }
  //       }
  //     }
  //   },
  // })
  // getCarNamesList(): any[] {
  //   return CAR_BRANDS_LIST;
  // }
  //
  // @Get("carModelsByBrandList")
  // getCarModelsByBrand(@Query("brandId") brandId: string) {
  //   console.log('brandId',brandId);
  //
  //   if (brandId) {
  //     return CAR_MODELS_LIST.find(item => item.carBrandId === parseInt(brandId)).models;
  //   } else {
  //     throw new HttpException("Такого авто не існує", HttpStatus.BAD_REQUEST);
  //   }
  // }
  //
  // @Get("getCitiesByCountry/:country")
  // @ApiOkResponse()
  // getCitiesByCountry(@Param("country") countryParam: string) {
  //   if (All_CITIES_BY_COUNTRY[countryParam]) {
  //     return All_CITIES_BY_COUNTRY[countryParam];
  //   } else {
  //     throw new HttpException("Такоі краіни не існує", HttpStatus.BAD_REQUEST);
  //   }
  // }
  //
  // @Get("carDetails")
  // @ApiOkResponse()
  // getCarDetails() {
  //   return carDetails;
  // }
}
