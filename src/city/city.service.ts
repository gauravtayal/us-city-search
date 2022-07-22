import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City, CityDocument } from './city.schema';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City.name) private readonly cityModel: Model<CityDocument>,
  ) {}

  async findAll(queryParam): Promise<City[]> {
    const sortingParam =
      queryParam.sort && queryParam.sort !== '' ? queryParam.sort : 'name';

    return this.cityModel
      .find({
        name: { $regex: queryParam.q, $options: 'i' },
      })
      .sort({ sortingParam: 1 })
      .select({ name: 1, long: 1, lat: 1, distance: 1 })
      .exec();
  }
}
