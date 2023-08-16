import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Board } from "src/boards/board.entity";
import { BoardRepository } from "src/boards/board.repository";

export const typeORMConfig : TypeOrmModuleOptions ={
    type: 'postgres',
    host:'localhost',
    port: 5432,
    username: 'postgres',
    password: '0000',
    database: 'board-app',
    //autoLoadEntities: true,
    entities: [__dirname + '/../**/*.entity.{js,ts}',Board],
    synchronize: true
}