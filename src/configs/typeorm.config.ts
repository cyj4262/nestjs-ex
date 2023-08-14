import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { BoardRepository } from "src/boards/board.repository";

export const typeORMConfig : TypeOrmModuleOptions ={
    type: 'postgres',
    host:'localhost',
    port: 5432,
    username: 'postgres',
    password: '0000',
    database: 'board-app',
    entities: [__dirname + '/../**/*.entity.{js,ts}',BoardRepository],
    synchronize: true
}