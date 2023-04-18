import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './books.entity';
import { ILike, Repository } from 'typeorm';
import { CreateBooksDto } from './dto/create-books.dto';
import { UpdateBooksDto } from './dto/update-books.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
  ) {}

  findAll() {
    return this.bookRepo.find({
      relations: {author: true}
    });
  }

  async getAllFilter(title) {
    const filter = await this.bookRepo.find({
      where: {title: ILike(`%${title}%`)}
    });

    if(!filter.length) {
      return "xato malumot kiritdingiz"
    }
    return filter
  }

  async findOne(book_id: number) {
    return await this.bookRepo.findOneBy({ book_id })
  }

  async create(data: CreateBooksDto) {
    const book = await this.bookRepo.create(data)
    this.bookRepo.save(book)
    return book
  }

  async update(book_id: number, body: UpdateBooksDto) {
    await this.bookRepo.update({ book_id }, body)
    return await this.bookRepo.findOneBy({ book_id })
  }

  async delete(book_id: number) {
    return await this.bookRepo.delete({ book_id })
  }
}
