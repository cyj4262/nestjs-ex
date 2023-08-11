import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('boards')
export class BoardsController {
    constructor(private BoardsService: BoardsService) { }

    @Get('/')
    getAllBoards(): Board[] {
        return this.BoardsService.getAllBoards();
    }

    @Post()
    createBoard(
        //@Body() body,
        @Body('title') title: string,
        @Body('description') description: string
    ): Board {
        //console.log(body);
        return this.BoardsService.createBoard(title, description);
    }


}
