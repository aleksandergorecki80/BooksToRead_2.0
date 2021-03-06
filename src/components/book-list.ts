import { booksState, Book } from '../state/books-state';
import { BaseComponent } from './base-component';
import { BookItem } from './book-item';
import { Autobind } from '../decorators/autobind';

export class BookList extends BaseComponent<
  HTMLDivElement,
  HTMLTemplateElement
> {
  addedBooks: Book[];

  constructor() {
    super('books-list-template', 'app', true);

    this.addedBooks = booksState.localBooksData;

    booksState.addListener((books: Book[]) => {
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
        case 'author-container':
          return book.author === value;
        case 'category-container':
          return book.category === value;
        case 'rating-container':
          return book.rating.toString() === value;
        default:
          return book;
      }
    });

    this.addedBooks = filteredBooks;
    booksState.updateListeners(filteredBooks);
    this.renderBooks();
  }

  @Autobind
  sortSelectHandler() {
    const selectedElement = document.getElementById(
      'sortBy'
    )! as HTMLInputElement;
    const selectedValue = selectedElement.value;

    let sortedBooks: Book[];
    sortedBooks = booksState.sortBy(selectedValue);
    if (selectedValue === 'rating') {
      sortedBooks.reverse();
    }

    booksState.updateListeners(sortedBooks);
    this.addedBooks = sortedBooks;
    this.renderBooks();
  }

  renderBooks() {
    const listEl = document.getElementById('books-list')! as HTMLUListElement;
    listEl.innerHTML = '';

    if (this.addedBooks.length === 0) {
      listEl.innerHTML = '<p class="no-books-added">No books added yet.<p>';
    } else {
      for (const bookItem of this.addedBooks) {
        new BookItem(bookItem);
      }
    }
  }

  configure(): void {
    this.element
      .querySelector('#show-all')!
      .addEventListener('click', this.allBookHandler);
    this.element
      .querySelector('#sortBy')!
      .addEventListener('change', this.sortSelectHandler);
  }

  renderContent() {}

  attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}
