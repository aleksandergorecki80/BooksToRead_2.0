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

    this.addedBooks = [];

    booksState.addListener((books: Book[]) => {
      // TU DODAJ FILTROWANIE

      this.addedBooks = books;
      this.renderBooks();
    });

    this.attach();
    this.renderContent();
  }

  renderBooks() {
    const listEl = document.getElementById('books-list')! as HTMLUListElement;
    listEl.innerHTML = '';
    for (const bookItem of this.addedBooks) {
      // const listItem = document.createElement('li');
      // listItem.textContent = bookItem.title;

      const listItem = new BookItem(bookItem);

      console.log(listItem, 'list item');
      // listEl.appendChild(listItem);
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
