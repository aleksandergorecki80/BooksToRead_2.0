// Add VALIDATION !!!

import { Autobind } from '../decorators/autobind';
import { booksState } from '../state/books-state';
import { BaseComponent } from './base-component';
// import { regExPatterns } from '../utils/regExPatterns';

export class BookInput extends BaseComponent<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  authorInputElement: HTMLInputElement;
  categoryInputElement: HTMLInputElement;
  ratingInputElement: HTMLInputElement;
  idElement: HTMLInputElement;

  validationSuccess: boolean = false;

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
  private validateInput(e: Event): boolean {
    const element = e.target as HTMLInputElement;

    switch (element.id) {
      case 'title':
        console.log(element.id);
        break;
      case 'author':
        console.log(element.id);
        break;
      case 'category':
        console.log(element.id);
        break;
        break;
      case 'rating':
        console.log(element.id);
        break;
    }

    return true;
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();

    if (this.validationSuccess) {
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, author, category, rating, id] = userInput;

        if (booksState.returnEditMode()) {
          booksState.editBook(title, author, category, rating, id);
        } else {
          booksState.addBook(title, author, category, rating);
        }
        booksState.switchEditMode();
        this.clearInputs();

        const button = document.getElementById('submit')! as HTMLInputElement;
        button.value = 'ADD BOOK';
      }
    } else {
      throw new Error('Please fill in the form');
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.authorInputElement.value = '';
    this.categoryInputElement.value = '';
    this.ratingInputElement.value = '';
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
    this.titleInputElement.addEventListener('keyup', this.validateInput);
    this.authorInputElement.addEventListener('keyup', this.validateInput);
    this.categoryInputElement.addEventListener('change', this.validateInput);
    this.ratingInputElement.addEventListener('change', this.validateInput);
  }

  renderContent(): void {}
}
