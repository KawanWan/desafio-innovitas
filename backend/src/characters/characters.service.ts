import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from '../character.entity';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private charactersRepository: Repository<Character>,
  ) {}

  async create(
    characterData: Partial<Character>,
    userId: number,
  ): Promise<Character> {
    const newCharacter = this.charactersRepository.create({
      ...characterData,
      user_id: userId,
    });
    return this.charactersRepository.save(newCharacter);
  }

  async findAllByUser(userId: number): Promise<Character[]> {
    return this.charactersRepository.find({ where: { user_id: userId } });
  }

  async findOne(id: number, userId: number): Promise<Character> {
    const character = await this.charactersRepository.findOne({
      where: { id, user_id: userId },
    });

    if (!character) {
      throw new NotFoundException(
        'Personagem nao encontrado nesta unidade de custodia.',
      );
    }
    return character;
  }

  async update(
    id: number,
    updateData: Partial<Character>,
    userId: number,
  ): Promise<Character> {
    await this.findOne(id, userId);
    await this.charactersRepository.update(id, updateData);
    return this.findOne(id, userId);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.charactersRepository.delete({ id, user_id: userId });
  }
}
