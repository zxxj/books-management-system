import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/boot.entity';
import { randomInt } from 'crypto';

@Injectable()
export class BookService {
  constructor(@Inject(DbService) private readonly dbService: DbService) {}

  async list() {
    const books: Book[] = await this.dbService.read();

    return books;
  }

  async findById(id: number) {
    const books: Book[] = await this.dbService.read();

    return books.find((book) => book.id === id);
  }

  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();

    const book = new Book();
    book.id = randomInt(99);
    book.name = createBookDto.name;
    book.author = createBookDto.author;
    book.description = createBookDto.description;
    book.cover = createBookDto.cover;

    books.push(book);

    await this.dbService.write(books);
    return book;
  }

  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();

    const foundBook = books.find((book) => book.id === updateBookDto.id);

    if (!foundBook) {
      throw new BadRequestException(`该图书不存在 id:${updateBookDto.id}`);
    }

    foundBook.name = updateBookDto.name;
    foundBook.description = updateBookDto.description;
    foundBook.author = updateBookDto.author;
    foundBook.cover = updateBookDto.cover;

    await this.dbService.write(books);

    return foundBook;
  }

  async delete(id: number) {
    const books: Book[] = await this.dbService.read();
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
      books.splice(index, 1);

      await this.dbService.write(books);
    }
  }
}
