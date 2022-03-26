var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Autobind } from '../decorators/autobind';
import { BaseComponent } from './base-component';
import { booksState } from '../state/books-state';
import { bookList } from '../app';
export class BookItem extends BaseComponent {
    constructor(book) {
        super('single-book', 'books-list', true);
        this.book = book;
        this.configure();
        this.renderContent();
    }
    deleteHandler() {
        booksState.deleteBook(this.book.id);
    }
    editHendler() {
        const title = document.getElementById('title');
        const author = document.getElementById('author');
        const category = document.getElementById('category');
        const rating = document.getElementById('rating');
        const id = document.getElementById('id');
        title.value = this.book.title;
        author.value = this.book.author;
        category.value = this.book.category;
        rating.value = this.book.rating.toString();
        id.value = this.book.id;
        const button = document.getElementById('submit');
        button.value = 'UPDATE BOOK';
        booksState.switchEditMode();
    }
    selectedFilterHendler(e) {
        const element = e.target;
        const tagName = element.tagName;
        const filterSelected = this.element.querySelector(tagName);
        const value = filterSelected.innerText.toString();
        bookList.filterResults(value, tagName);
    }
    configure() {
        this.element
            .querySelector('#delete')
            .addEventListener('click', this.deleteHandler);
        this.element
            .querySelector('#edit')
            .addEventListener('click', this.editHendler);
        this.element
            .querySelector('h3')
            .addEventListener('click', this.selectedFilterHendler);
        this.element
            .querySelector('h4')
            .addEventListener('click', this.selectedFilterHendler);
        this.element
            .querySelector('p')
            .addEventListener('click', this.selectedFilterHendler);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.book.title;
        this.element.querySelector('h3').textContent = this.book.author;
        this.element.querySelector('h4').textContent = this.book.category;
        this.element.querySelector('p').textContent = this.book.rating.toString();
    }
}
__decorate([
    Autobind
], BookItem.prototype, "deleteHandler", null);
__decorate([
    Autobind
], BookItem.prototype, "editHendler", null);
__decorate([
    Autobind
], BookItem.prototype, "selectedFilterHendler", null);
//# sourceMappingURL=book-item.js.map