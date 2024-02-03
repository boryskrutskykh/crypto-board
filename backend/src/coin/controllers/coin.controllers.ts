import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Get,
} from '@nestjs/common';
import { CoinService } from '../services/coin.service';
import { CreateCoinDto } from '../dto/create-coin.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Coin } from '../entities/coin.entity';

@ApiTags('coins')
@Controller('coins')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Создать новую монету' })
  @ApiResponse({ status: 201, description: 'Монета успешно создана.' })
  @ApiResponse({ status: 400, description: 'Неверный запрос.' })
  async createCoin(@Body() createCoinDto: CreateCoinDto) {
    return this.coinService.createCoin(createCoinDto);
  }

  @Get()
  @ApiOperation({ summary: 'Возвращает список всех монет' })
  @ApiOkResponse({ description: 'Возвращает список всех монет', type: [Coin] })
  async findAll(): Promise<Coin[]> {
    return this.coinService.findAll();
  }
}
