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

  //  VALIDATION

  runAllValidations() {
    const titleRegex = /^[a-ząĄćĆĘęŁłŃńÓóŚśŹźŻż\d\s]{3,150}$/gi;
    const authorRegex = /^[a-ząĄćĆĘęŁłŃńÓóŚśŹźŻż\d\s]{3,150}$/gi;
    const categoryRegex = /^fantasy|poetry|drama$/;
    const ratingRegex = /^[1-5]$/;

    const validateTitle = this.validation(this.titleInputElement, titleRegex);
    const validateAuthor = this.validation(
      this.authorInputElement,
      authorRegex
    );
    const validateCategory = this.validation(
      this.categoryInputElement,
      categoryRegex
    );
    const validateRating = this.validation(
      this.ratingInputElement,
      ratingRegex
    );
    return (
      validateTitle && validateAuthor && validateCategory && validateRating
    );
  }

  @Autobind
  private validation(inputElement: HTMLInputElement, regEx: any): boolean {
    const result = regEx.test(inputElement.value);
    this.useCSSStyles(inputElement, result);
    return result;
  }

  @Autobind
  private validateInputs(e: Event): boolean {
    const element = e.target as HTMLInputElement;

    switch (element.id) {
      case 'title':
        const titleRegex = /^[a-ząĄćĆĘęŁłŃńÓóŚśŹźŻż\d\s]{3,150}$/gi;
        this.validation(this.titleInputElement, titleRegex);
        break;
      case 'author':
        const authorRegex = /^[a-ząĄćĆĘęŁłŃńÓóŚśŹźŻż\d\s]{3,150}$/gi;
        this.validation(this.authorInputElement, authorRegex);
        break;
      case 'category':
        const categoryRegex = /^fantasy|poetry|drama$/;
        this.validation(this.categoryInputElement, categoryRegex);
        break;
      case 'rating':
        const ratingRegex = /^[1-5]$/;
        this.validation(this.ratingInputElement, ratingRegex);
        break;
    }

    return true;
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();

    if (this.runAllValidations()) {
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
    this.titleInputElement.addEventListener('keyup', this.validateInputs);
    this.titleInputElement.addEventListener('blur', () => {
      if (this.titleInputElement.value === '') {
        this.titleInputElement.classList.remove('input-error');
      }
    });

    this.authorInputElement.addEventListener('keyup', this.validateInputs);
    this.categoryInputElement.addEventListener('change', this.validateInputs);
    this.ratingInputElement.addEventListener('change', this.validateInputs);
  }

  renderContent(): void {}
}
