// Add VALIDATION !!!

import { Autobind } from '../decorators/autobind';
import { booksState } from '../state/books-state';
import { BaseComponent } from './base-component';

export class BookInput extends BaseComponent<HTMLDivElement, HTMLFormElement> {
  // templateElement: HTMLTemplateElement;
  // hostElement: HTMLDivElement;
  // element: HTMLFormElement;

  titleInputElement: HTMLInputElement;
  authorInputElement: HTMLInputElement;
  categoryInputElement: HTMLInputElement;
  ratingInputElement: HTMLInputElement;

  constructor() {
    super('book-input', 'app', true);
    // this.templateElement = document.getElementById(
    //   'book-input'
    // )! as HTMLTemplateElement;
    // this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // const importedNode = document.importNode(
    //   this.templateElement.content,
    //   true
    // );

    // this.element = importedNode.firstElementChild as HTMLFormElement;

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

    this.configure();
    // this.attach();
  }

  private gatherUserInput(): [string, string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredAuthor = this.authorInputElement.value;
    const enteredCategory = this.categoryInputElement.value;
    const enteredRating = this.ratingInputElement.value;

    // Add VALIDATION HERE

    return [
      enteredTitle,
      enteredAuthor,
      enteredCategory,
      parseInt(enteredRating),
    ];
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, author, category, rating] = userInput;
      booksState.addBook(title, author, category, rating);
    } else {
      throw new Error('Please fill in the form');
    }
    this.clearInputs();
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

  // private attach() {
  //   this.hostElement.insertAdjacentElement('afterbegin', this.element);
  // }
}
