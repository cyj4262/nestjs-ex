import { CreateBoardDto } from './dto/create-board.dto';
import { EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";
import { Injectable } from "@nestjs/common";
import { BoardStatus } from './board-status.enum';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board>{
    

}