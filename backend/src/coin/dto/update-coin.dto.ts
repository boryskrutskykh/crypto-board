import { PartialType } from '@nestjs/mapped-types';
import { CreateCoinDto } from './create-coin.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCoinDto extends PartialType(CreateCoinDto) {
  @ApiProperty({ description: 'Название монеты' })
  coin: string;

  @ApiProperty({description: "Обьем"})
  volume: number;

  averagePrice?: number;
  currentPrice?: number;

  @ApiProperty({description: "Количество"})
  amount: number;

  price?: number;
  profit?: number;
  percentage?: number;
}