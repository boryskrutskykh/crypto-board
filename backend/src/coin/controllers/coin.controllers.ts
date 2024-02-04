import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Get,
  Delete,
  Param,
  HttpException,
  ParseIntPipe,
  Put,
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
import { UpdateCoinDto } from '../dto/update-coin.dto';

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
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Возвращает список всех монет' })
  @ApiOkResponse({ description: 'Возвращает список всех монет', type: [Coin] })
  async findAll(): Promise<Coin[]> {
    return this.coinService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить монету' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Монета успешно удалена.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Монета не найдена.',
  })
  async deleteCoin(
    @Param('id') id: number,
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    try {
      await this.coinService.deleteCoin(id);
      return {
        statusCode: HttpStatus.OK,
        message: `Монета с ID ${id} успешно удалена.`,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Произошла внутренняя ошибка сервера',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Обновить монету' })
  @ApiOkResponse({ description: 'Монета успешно обновлена.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Монета не найдена.',
  })
  async updateCoin(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCoinDto: UpdateCoinDto,
  ): Promise<Coin> {
    return this.coinService.updateCoin(id, updateCoinDto);
  }
}
