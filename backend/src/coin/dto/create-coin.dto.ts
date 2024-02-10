import { ApiProperty } from '@nestjs/swagger';

export class CreateCoinDto {
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
