import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './city.schema';
import { Request, Response } from 'express';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  @Get('/suggestions')
  async findAll(@Req() req: Request, @Res() res: Response) {
    const queryData = req.query;
    console.log('queryData', queryData);
    const resData = await this.cityService.findAll(queryData);
    res.status(200).send({ suggestions: resData });
  }
}
