var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Autobind } from '../decorators/autobind';
import { booksState } from '../state/books-state';
import { BaseComponent } from './base-component';
export class BookInput extends BaseComponent {
    constructor() {
        super('book-input', 'app', true);
        this.titleInputElement = this.element.querySelector('#title');
        this.authorInputElement = this.element.querySelector('#author');
        this.categoryInputElement = this.element.querySelector('#category');
        this.ratingInputElement = this.element.querySelector('#rating');
        this.idElement = this.element.querySelector('#id');
        this.configure();
    }
    gatherUserInput() {
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
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, author, category, rating, id] = userInput;
            if (booksState.returnEditMode()) {
                booksState.editBook(title, author, category, rating, id);
            }
            else {
                booksState.addBook(title, author, category, rating);
            }
        }
        else {
            throw new Error('Please fill in the form');
        }
        booksState.switchEditMode();
        this.clearInputs();
        const button = document.getElementById('submit');
        button.value = 'ADD BOOK';
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.authorInputElement.value = '';
        this.categoryInputElement.value = '';
        this.ratingInputElement.value = '';
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
}
__decorate([
    Autobind
], BookInput.prototype, "submitHandler", null);
//# sourceMappingURL=book-input.js.map