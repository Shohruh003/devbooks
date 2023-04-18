import { Body, Controller, Delete, Get, Param, Patch, Post, HttpCode, HttpStatus, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { resolve } from 'path';
import { JwtGuards } from '../auth/guards/jwt.guards';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Get()    
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.authorService.findAll();
  }

  @Get(":name")    
  @HttpCode(HttpStatus.OK)
  getAllFilter(@Param('name') first_name: string) {
    return this.authorService.getAllFilter(first_name);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }

  @UseGuards(JwtGuards)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateAuthorDto) {
    return this.authorService.create(body);
  }

  @UseGuards(JwtGuards)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: number, @Body() body: UpdateAuthorDto) {
    this.authorService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: number) {
    this.authorService.delete(id);
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
