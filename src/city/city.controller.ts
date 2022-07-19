import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './city.schema';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  @Get()
  async findAll(): Promise<City[]> {
    return this.cityService.findAll();
  }
}
