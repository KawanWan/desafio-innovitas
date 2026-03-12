import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { CharactersService } from './characters.service';
import { AuthGuard } from '../auth/auth.guard';
import { Character } from '../character.entity';

interface RequestWithUser extends ExpressRequest {
  user: {
    sub: number;
    username: string;
  };
}

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() characterData: Partial<Character>,
    @Request() req: RequestWithUser,
  ) {
    const userId = req.user.sub;
    return this.charactersService.create(characterData, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: RequestWithUser) {
    const userId = req.user.sub;
    return this.charactersService.findAllByUser(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    const userId = req.user.sub;
    return this.charactersService.findOne(+id, userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<Character>,
    @Request() req: RequestWithUser,
  ) {
    const userId = req.user.sub;
    return this.charactersService.update(+id, updateData, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    const userId = req.user.sub;
    return this.charactersService.remove(+id, userId);
  }
}
