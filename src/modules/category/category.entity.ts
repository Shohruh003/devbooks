import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from '../author/author.entity';
import { Book } from '../books/books.entity';

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  category_title: string;

  @OneToMany(() => Author, (author) => author.category_id)
  author: Author[]


  @OneToMany(() => Book, (books) => books.categorys_id)
  books: Book[]

}
