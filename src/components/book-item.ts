import { Autobind } from '../decorators/autobind';
import { Book } from '../state/books-state';
import { BaseComponent } from './base-component';
import { booksState } from '../state/books-state';

export class BookItem extends BaseComponent<HTMLUListElement, HTMLLIElement> {
  private book: Book;
  constructor(book: Book) {
    super('single-book', 'books-list', true);
    this.book = book;
    this.configure();
    this.renderContent();
  }

  @Autobind
  private deleteHandler(): void {
    booksState.deleteBook(this.book.id);
  }

  configure(): void {
    this.element
      .querySelector('button')!
      .addEventListener('click', this.deleteHandler);
  }

  renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.book.title;
    this.element.querySelector('h3')!.textContent = this.book.author;
    this.element.querySelector('h4')!.textContent = this.book.category;
    this.element.querySelector('p')!.textContent = this.book.rating.toString();
    // this.element
    //   .querySelector('button')!
    //   .setAttribute('data-id', this.book.id.toString());
  }
}

/*

// Using setAttribute:
document.getElementById('vsIDButton').setAttribute('data-whatever', vSourceID);

// Using dataset (you only need one or another):
document.getElementById('vsIDButton').dataset.whatever = vSourceID;

*/
