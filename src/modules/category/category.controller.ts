import { Controller, Get, Post, Param, Body, Delete, Patch, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtGuards } from '../auth/guards/jwt.guards';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get("")
  findall() {
    return this.categoryService.findAll();
  }

  @Get("/author")
  find() {
    return this.categoryService.findAll();
  }

  @Get("/books")
  getAll() {
    return this.categoryService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @UseGuards(JwtGuards)
  @Post()
  create(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }

  @UseGuards(JwtGuards)
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateCategoryDto) {
    this.categoryService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.categoryService.delete(id);
  }
}
