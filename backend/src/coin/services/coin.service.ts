import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coin } from '../entities/coin.entity';
import { CreateCoinDto } from '../dto/create-coin.dto';

@Injectable()
export class CoinService {
  constructor(
    @InjectRepository(Coin)
    private coinRepository: Repository<Coin>,
  ) {}

  async createCoin(createCoinDto: CreateCoinDto): Promise<Coin> {
    const newCoin = this.coinRepository.create(createCoinDto);
    return this.coinRepository.save(newCoin);
  }

  async findAll(): Promise<Coin[]> {
    return this.coinRepository.find();
  }
}
