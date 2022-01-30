import { booksState, Book } from '../state/books-state';

export class BookList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  addedBooks: Book[];

  constructor(private sectionTitle: string) {
    this.templateElement = document.getElementById(
      'books-list-template'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app') as HTMLDivElement;
    this.addedBooks = [];

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as HTMLElement;

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
      const listItem = document.createElement('li');
      listItem.textContent = bookItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    this.element.querySelector('h2')!.textContent = this.sectionTitle;
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}
