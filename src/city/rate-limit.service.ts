import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRateLimitDto } from './dto/create-rate.dto';
import { RateLimit, RateLimitDocument } from './rate-limit.schema';

@Injectable()
export class RateLimitService {
  constructor(
    @InjectModel(RateLimit.name)
    private readonly rateLimitModel: Model<RateLimitDocument>,
  ) {}

  async create(createRateLimitDto: CreateRateLimitDto): Promise<RateLimit> {
    const createdCat = new this.rateLimitModel(createRateLimitDto);
    return createdCat.save();
  }

  async update({ ipAddress, count }, id: string): Promise<RateLimit> {
    return this.rateLimitModel.findOneAndUpdate(
      { _id: id },
      { ipAddress, count },
    );
  }

  async findOne(ipAddressData: string): Promise<RateLimit> {
    return this.rateLimitModel.findOne({
      ipAddress: ipAddressData,
    });
  }
}
