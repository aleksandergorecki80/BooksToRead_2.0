import { booksState, Book } from '../state/books-state';
import { BaseComponent } from './base-component';
import { BookItem } from './book-item';
import { Autobind } from '../decorators/autobind';

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

  @Autobind
  allBookHandler() {
    this.filterResults();
  }

  filterResults(value?: string, filterName?: string) {
    const filteredBooks = booksState.allBooks.filter((book) => {
      switch (filterName) {
        case 'H3':
          return book.author === value;
        case 'H4':
          return book.category === value;
        case 'P':
          return book.rating.toString() === value;
        default:
          return book;
      }
    });

    this.addedBooks = filteredBooks;
    booksState.updateListeners(filteredBooks);
    this.renderBooks();
  }

  renderBooks() {
    const listEl = document.getElementById('books-list')! as HTMLUListElement;
    listEl.innerHTML = '';
    for (const bookItem of this.addedBooks) {
      new BookItem(bookItem);
    }
  }

  configure(): void {
    this.element
      .querySelector('h2')!
      .addEventListener('click', this.allBookHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.sectionTitle;
  }

  attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}
