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
import { CreateRateLimitDto } from './dto/create-rate.dto';
import { RateLimitService } from './rate-limit.service';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';

@Controller('city')
export class CityController {
  constructor(
    private readonly cityService: CityService,
    private readonly rateLimitService: RateLimitService,
  ) {}
  @Get('/suggestions')
  async findAll(@Req() req: Request, @Res() res: Response) {
    const queryData = req.query;
    const remoteAddr = req.socket.remoteAddress;
    const currentDateTime = new Date(Date.now());
    let checkData = await this.rateLimitService.findOne(remoteAddr);
    const id = new mongoose.Types.ObjectId().toHexString();
    if (!checkData) {
      checkData = await this.rateLimitService.create({
        _id: id,
        ipAddress: remoteAddr,
        count: 1,
      });
    }

    const updateDateValue = new Date(checkData.updated_at);

    const differenceDate = Math.abs(
      currentDateTime.getTime() - updateDateValue.getTime(),
    );

    const timeinSec = Math.round(differenceDate / 1000);

    console.log(checkData);
    console.log(timeinSec);

    if (timeinSec > 60) {
      const updateRateLimit = await this.rateLimitService.update(
        {
          ipAddress: remoteAddr,
          count: 1,
        },
        checkData._id,
      );
      const resData = await this.cityService.findAll(queryData);
      res.status(200).send({ suggestions: resData });
    } else if (timeinSec < 60 && checkData.count > 5) {
      res.status(200).send({ message: 'Please try after one minute' });
    } else if (timeinSec < 60 && checkData.count < 5) {
      const updateRateLimit = await this.rateLimitService.update(
        {
          ipAddress: remoteAddr,
          count: checkData.count + 1,
        },
        checkData._id,
      );
      const resData = await this.cityService.findAll(queryData);
      res.status(200).send({ suggestions: resData });
    } else {
      res.status(500).send({ message: 'something went wrong' });
    }
  }
}
