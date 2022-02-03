import { booksState, Book } from '../state/books-state';
import { BaseComponent } from './base-component';
import { BookItem } from './book-item';

export class BookList extends BaseComponent<
  HTMLDivElement,
  HTMLTemplateElement
> {
  addedBooks: Book[];

  constructor(private sectionTitle: string) {
    super('books-list-template', 'app', true);

    this.addedBooks = booksState.localBooksData;

    booksState.addListener((books: Book[]) => {
      // TU DODAJ FILTROWANIE

      this.addedBooks = books;
      this.renderBooks();
    });
    this.renderBooks();
    this.attach();
    this.configure();
    this.renderContent();
  }

  filterResults(value: string) {
    const filteredBooks = this.addedBooks.filter(
      (book) => book.author === value
    );
    this.addedBooks = filteredBooks;
    this.renderBooks();
  }

  renderBooks() {
    const listEl = document.getElementById('books-list')! as HTMLUListElement;
    listEl.innerHTML = '';
    for (const bookItem of this.addedBooks) {
      new BookItem(bookItem);
    }
  }

  configure(): void {}

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.sectionTitle;
  }

  attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}
