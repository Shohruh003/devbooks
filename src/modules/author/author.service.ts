import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { ILike, Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private readonly authorRepo: Repository<Author>,
  ) {}

  findAll() {
    return this.authorRepo.find({
      relations: { books: true}
    });
  }

  async getAllFilter(first_name) {
    const filter = await this.authorRepo.find({
      where: {first_name: ILike(`%${first_name}%`)}
    });

    if(!filter.length) {
      return "xato malumot kiritdingiz"
    }
    return filter
  }

  async findOne(author_id: number) {
    return await this.authorRepo.findOneBy({ author_id })
  }

  async create(data: CreateAuthorDto) {
    const author = await this.authorRepo.create(data)
    this.authorRepo.save(author)
    return author
  }

  async update(author_id: number, body: UpdateAuthorDto) {
    await this.authorRepo.update({ author_id }, body)
    return await this.authorRepo.findOneBy({ author_id })
  }

  async delete(author_id: number) {
    return await this.authorRepo.delete({ author_id })
  }
}
