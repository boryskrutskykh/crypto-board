import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  coin: string;

  @Column('float')
  volume: number;

  @Column('float', { nullable: true })
  averagePrice?: number;

  @Column('float', { nullable: true })
  currentPrice?: number;

  @Column('float')
  amount: number;

  @Column('float', { nullable: true })
  price?: number;

  @Column('float', { nullable: true })
  profit?: number;

  @Column('float', { nullable: true })
  percentage?: number;
}
