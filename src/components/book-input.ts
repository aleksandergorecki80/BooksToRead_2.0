export class BookInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;

  titleInputElement: HTMLInputElement;
  authorInputElement: HTMLInputElement;
  categoryInputElement: HTMLInputElement;
  ratingInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'book-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.formElement = importedNode.firstElementChild as HTMLFormElement;

    this.titleInputElement = this.formElement.querySelector(
      '#title'
    ) as HTMLInputElement;

    this.authorInputElement = this.formElement.querySelector(
      '#author'
    ) as HTMLInputElement;

    this.categoryInputElement = this.formElement.querySelector(
      '#category'
    ) as HTMLInputElement;

    this.ratingInputElement = this.formElement.querySelector(
      '#rating'
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
    console.log(this.authorInputElement.value);
    console.log(this.categoryInputElement.value);
    console.log(this.ratingInputElement.value);
  }

  configure() {
    this.formElement.addEventListener('submit', this.submitHandler.bind(this));
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
  }
}
