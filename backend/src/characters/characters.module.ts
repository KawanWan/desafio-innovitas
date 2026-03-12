import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { Character } from '../character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character]), JwtModule],
  providers: [CharactersService],
  controllers: [CharactersController],
})
export class CharactersModule {}
