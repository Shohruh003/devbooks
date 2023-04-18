import { Controller, Post, Get, Patch, Delete, Body, Param, UseInterceptors, UploadedFile, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBooksDto } from './dto/create-books.dto';
import { UpdateBooksDto } from './dto/update-books.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { resolve } from 'path';
import { JwtGuards } from '../auth/guards/jwt.guards';
import { title } from 'process';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.booksService.findAll();
  }

  @Get(":title")    
  @HttpCode(HttpStatus.OK)
  getAllFilter(@Param('title') title: string) {
    return this.booksService.getAllFilter(title);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @UseGuards(JwtGuards)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateBooksDto) {
    return this.booksService.create(body);
  }

  @UseGuards(JwtGuards)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: number, @Body() body: UpdateBooksDto) {
    this.booksService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: number) {
    this.booksService.delete(id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: resolve(process.cwd(), 'uploads'),
        filename: (req, file, cb) => {
          const fileNameSplit = file.originalname.split('.');
          const fileExt = fileNameSplit[fileNameSplit.length - 1];
          cb(null, `${Date.now()}.${fileExt}`);
        },
      }),
    }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file.filename
  }
}
