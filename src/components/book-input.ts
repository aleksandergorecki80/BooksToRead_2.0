// Add VALIDATION !!!

import { Autobind } from '../decorators/autobind';
import { booksState } from '../state/books-state';
import { BaseComponent } from './base-component';
// import { regExPatterns, validate } from '../utils/validation';

interface errorsObject {
  titleError: boolean;
  authorError: boolean;
  categoryError: boolean;
  ratingError: boolean;
}

export class BookInput extends BaseComponent<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  authorInputElement: HTMLInputElement;
  categoryInputElement: HTMLInputElement;
  ratingInputElement: HTMLInputElement;
  idElement: HTMLInputElement;

  validationErrors: errorsObject = {
    titleError: true,
    authorError: true,
    categoryError: true,
    ratingError: true,
  };

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

  private useCSSStyles(element: HTMLInputElement, result: boolean): void {
    if (result) {
      element.classList.remove('input-error');
      element.classList.add('input-success');
    } else {
      element.classList.remove('input-success');
      element.classList.add('input-error');
    }
  }

  // private setErrorsStatus(inputField: boolean, result: boolean) {
  //   result ? (inputField = false) : (inputField = true);
  // }

  @Autobind
  private validateInput(e: Event): boolean {
    const element = e.target as HTMLInputElement;

    switch (element.id) {
      case 'title':
        const titleRegex = /^[a-ząĄćĆĘęŁłŃńÓóŚśŹźŻż\d\s]{3,150}$/gi;
        const titleResult = titleRegex.test(this.titleInputElement.value);
        this.useCSSStyles(this.titleInputElement, titleResult);
        titleResult
          ? (this.validationErrors.titleError = false)
          : (this.validationErrors.titleError = true);
        break;
      case 'author':
        const authorRegex = /^[a-ząĄćĆĘęŁłŃńÓóŚśŹźŻż\d\s]{3,150}$/gi;
        const authorResult = authorRegex.test(this.authorInputElement.value);
        this.useCSSStyles(this.authorInputElement, authorResult);
        authorResult
          ? (this.validationErrors.authorError = false)
          : (this.validationErrors.authorError = true);
        break;
      case 'category':
        const categoryRegex = /^fantasy|poetry|drama$/;
        // console.log(this.categoryInputElement.value);
        const categoryResult = categoryRegex.test(
          this.categoryInputElement.value
        );
        this.useCSSStyles(this.categoryInputElement, categoryResult);
        categoryResult
          ? (this.validationErrors.categoryError = false)
          : (this.validationErrors.categoryError = true);
        break;
      case 'rating':
        console.log(this.ratingInputElement.value);
        const ratingRegex = /^[1-5]$/;
        const ratingResult = ratingRegex.test(this.ratingInputElement.value);
        this.useCSSStyles(this.ratingInputElement, ratingResult);
        ratingResult
          ? (this.validationErrors.ratingError = false)
          : (this.validationErrors.ratingError = true);
        break;
    }
    console.log(this.validationErrors);
    return true;
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();

    if (
      !this.validationErrors.titleError &&
      !this.validationErrors.authorError &&
      !this.validationErrors.categoryError &&
      !this.validationErrors.ratingError
    ) {
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
    // FORM LISTENER
    this.element.addEventListener('submit', this.submitHandler);

    // INPUTS LISTENERS
    this.titleInputElement.addEventListener('keyup', this.validateInput);
    this.titleInputElement.addEventListener('blur', () => {
      if (this.titleInputElement.value === '') {
        this.titleInputElement.classList.remove('input-error');
      }
    });

    this.authorInputElement.addEventListener('keyup', this.validateInput);
    this.categoryInputElement.addEventListener('change', this.validateInput);
    // this.ratingInputElement.addEventListener('change', this.validateInput);
    this.ratingInputElement.addEventListener('keyup', this.validateInput);
  }

  renderContent(): void {}
}
