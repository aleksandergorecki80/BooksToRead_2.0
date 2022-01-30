import { Book } from '../state/books-state';
import { BaseComponent } from './base-component';

export class BookItem extends BaseComponent<HTMLUListElement, HTMLLIElement> {
  private book: Book;
  constructor(book: Book) {
    super('single-book', 'books-list', true);
    this.book = book;
    this.configure();
    this.renderContent();
  }

  configure(): void {}

  renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.book.title;
    this.element.querySelector('h3')!.textContent = this.book.author;
    this.element.querySelector('h4')!.textContent = this.book.category;
    this.element.querySelector('p')!.textContent = this.book.rating.toString();
  }
}
