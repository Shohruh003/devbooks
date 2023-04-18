import { Module } from '@nestjs/common';
import { AuthorModule } from './modules/author/author.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './modules/author/author.entity';
import { BooksModule } from './modules/books/books.module';
import { Book } from './modules/books/books.entity';
import { CategoryModule } from './modules/category/category.module';
import { Category } from './modules/category/category.entity';
import { config } from './config/index';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/user/user.entity';

@Module({
  imports: [ConfigModule.forRoot(config),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: 5432,
      username: process.env.DB_USER,
      entities: [Author, Book, Category, User],
      synchronize: true,
    }),
    AuthorModule,
    BooksModule,
    CategoryModule,
    UserModule,
    AuthModule
  ],
})
export class AppModule {}
