import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCityDto } from './dto/create-city.dto';
import { City, CityDocument } from './city.schema';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City.name) private readonly cityModel: Model<CityDocument>,
  ) {}

  async findAll(queryParam): Promise<City[]> {
    return this.cityModel
      .find({
        name: { $regex: queryParam.q, $options: 'i' },
        distance: {
          $geoNear: {
            $maxDistance: 5000,
            $geometry: {
              type: 'Point',
              coordinates: [queryParam.latitude, queryParam.longitude],
            },
          },
        },
      })
      .select({ name: 1, long: 1, lat: 1, distance: 1 })
      .exec();
  }
}
