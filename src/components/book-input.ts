// Add VALIDATION !!!

import { Autobind } from '../decorators/autobind';
import { booksState } from '../state/books-state';
import { BaseComponent } from './base-component';

export class BookInput extends BaseComponent<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  authorInputElement: HTMLInputElement;
  categoryInputElement: HTMLInputElement;
  ratingInputElement: HTMLInputElement;
  idElement: HTMLInputElement;

  constructor() {
    super('book-input', 'app', true);

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;

    this.authorInputElement = this.element.querySelector(
      '#author'
    ) as HTMLInputElement;

    this.categoryInputElement = this.element.querySelector(
      '#category'
    ) as HTMLInputElement;

    this.ratingInputElement = this.element.querySelector(
      '#rating'
    ) as HTMLInputElement;

    this.idElement = this.element.querySelector('#id')! as HTMLInputElement;

    this.configure();
    // this.attach();
  }

  private gatherUserInput():
    | [string, string, string, number, string | undefined]
    | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredAuthor = this.authorInputElement.value;
    const enteredCategory = this.categoryInputElement.value;
    const enteredRating = this.ratingInputElement.value;
    const enteredId = this.idElement.value;

    // Add VALIDATION HERE

    return [
      enteredTitle,
      enteredAuthor,
      enteredCategory,
      parseInt(enteredRating),
      enteredId,
    ];
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, author, category, rating, id] = userInput;

      if (booksState.returnEditMode()) {
        booksState.editBook(title, author, category, rating, id);
      } else {
        booksState.addBook(title, author, category, rating);
      }
    } else {
      throw new Error('Please fill in the form');
    }
    booksState.switchEditMode();
    this.clearInputs();

    const button = document.getElementById('submit')! as HTMLInputElement;
    button.value = 'ADD BOOK';
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.authorInputElement.value = '';
    this.categoryInputElement.value = '';
    this.ratingInputElement.value = '';
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent(): void {}
}
