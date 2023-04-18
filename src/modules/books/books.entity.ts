import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../category/category.entity';
import { Author } from '../author/author.entity';

@Entity({ name: 'book' })
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  book_id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  pages: number;

  @Column({
    type: 'smallint',
    nullable: false,
  })
  year: number;

  @Column({
    type: 'smallint',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  img: string;


  @ManyToOne(() => Category, (categorys) => categorys.books)
  categorys_id: Category[]

  @ManyToOne(() => Author, (author) => author.books)
  author_id: Author[]
}
