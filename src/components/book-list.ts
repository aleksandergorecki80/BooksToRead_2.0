export class BookList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private sectionTitle: string) {
    this.templateElement = document.getElementById(
      'books-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app') as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as HTMLElement;
    this.attach();
    this.renderContent();
  }

  private renderContent() {
    this.element.querySelector('h2')!.textContent = this.sectionTitle;
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}
