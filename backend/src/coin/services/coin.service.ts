import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coin } from '../entities/coin.entity';
import { CreateCoinDto } from '../dto/create-coin.dto';
import { UpdateCoinDto } from '../dto/update-coin.dto';

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

  async deleteCoin(id: number): Promise<void> {
    const result = await this.coinRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Монета с ID ${id} не найдена.`);
    }
  }

  async updateCoin(id: number, updateCoinDto: UpdateCoinDto): Promise<Coin> {
    const coin = await this.coinRepository.preload({
      id: id,
      ...updateCoinDto,
    });

    if (!coin) {
      throw new NotFoundException(`Монета с ID ${id} не найдена.`);
    }

    return this.coinRepository.save(coin);
  }
}
