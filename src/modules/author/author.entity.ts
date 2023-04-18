import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../category/category.entity';
import { Book } from '../books/books.entity';

@Entity({ name: 'author' })
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn()
  author_id: number;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  last_name: string;


  @Column({
    type: 'smallint',
    nullable: false,
  })
  date_birth: number;

  @Column({
    type: 'smallint',
    nullable: false,
  })
  date_death: number;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  country: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  bio: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  img: string;


  @ManyToOne(() => Category, (categorys) => categorys.author)
  category_id: Category[]

  @OneToMany(() => Book, (book) => book.author_id)
  books: Book[]

  @ManyToOne(() => Book, (book) => book.author)
  book_id: Book[]
}
