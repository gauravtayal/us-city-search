import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { RateLimitService } from './rate-limit.service';
import { City, CitySchema } from './city.schema';
import { RateLimit, RateLimitSchema } from './rate-limit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: City.name, schema: CitySchema },
      { name: RateLimit.name, schema: RateLimitSchema },
    ]),
  ],
  controllers: [CityController],
  providers: [CityService, RateLimitService],
})
export class CityModule {}
