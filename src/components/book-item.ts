import { Autobind } from '../decorators/autobind';
import { Book } from '../state/books-state';
import { BaseComponent } from './base-component';
import { booksState } from '../state/books-state';
import { bookList } from '../app';

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

  @Autobind
  private editHendler(): void {
    const title = document.getElementById('title')! as HTMLInputElement;
    const author = document.getElementById('author')! as HTMLInputElement;
    const category = document.getElementById('category')! as HTMLSelectElement;
    const rating = document.getElementById('rating')! as HTMLInputElement;
    const id = document.getElementById('id')! as HTMLInputElement;

    // INSERTING BOOK'S DATA INTO THE FORM
    title.value = this.book.title;
    author.value = this.book.author;
    category.value = this.book.category;
    rating.value = this.book.rating.toString();
    id.value = this.book.id;

    const button = document.getElementById('submit')! as HTMLInputElement;
    button.value = 'UPDATE BOOK';

    booksState.switchEditMode();
  }

  @Autobind
  private selectedFilterHendler(e: Event): void {
    const element = e.target as HTMLElement;
    const tagName = element.tagName;
    const filterSelected = this.element.querySelector(tagName)! as HTMLElement;
    const value = filterSelected.innerText.toString();
    bookList.filterResults(value, tagName);
  }

  configure(): void {
    this.element
      .querySelector('#delete')!
      .addEventListener('click', this.deleteHandler);

    this.element
      .querySelector('#edit')!
      .addEventListener('click', this.editHendler);

    this.element
      .querySelector('h3')!
      .addEventListener('click', this.selectedFilterHendler);

    this.element
      .querySelector('h4')!
      .addEventListener('click', this.selectedFilterHendler);

    this.element
      .querySelector('p')!
      .addEventListener('click', this.selectedFilterHendler);
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
