import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find({
      relations: {author:true}
    });
  }

  getAll() {
    return this.categoryRepo.find({
      relations: {books:true}
    });
  }

  async findOne(category_id: number) {
    return await this.categoryRepo.findOneBy({ category_id })
  }

  async create(data: CreateCategoryDto) {
    const category = await this.categoryRepo.create(data)
    this.categoryRepo.save(category)
    return category
  }

  async update(category_id: number, body: UpdateCategoryDto) {
    await this.categoryRepo.update({ category_id }, body)
    return await this.categoryRepo.findOneBy({ category_id })
  }

  async delete(category_id: number) {
    return await this.categoryRepo.delete({ category_id })
  }
}
