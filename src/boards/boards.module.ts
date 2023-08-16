import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { TypeOrmExModule } from './typeorm-ex.module';

@Module({
  imports: [
    TypeOrmExModule .forCustomRepository([BoardRepository])
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
