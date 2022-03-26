var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { booksState } from '../state/books-state';
import { BaseComponent } from './base-component';
import { BookItem } from './book-item';
import { Autobind } from '../decorators/autobind';
export class BookList extends BaseComponent {
    constructor(sectionTitle) {
        super('books-list-template', 'app', true);
        this.sectionTitle = sectionTitle;
        this.addedBooks = booksState.localBooksData;
        booksState.addListener((books) => {
            this.addedBooks = books;
            this.renderBooks();
        });
        this.renderBooks();
        this.attach();
        this.configure();
        this.renderContent();
    }
    allBookHandler() {
        this.filterResults();
    }
    filterResults(value, filterName) {
        const filteredBooks = booksState.allBooks.filter((book) => {
            switch (filterName) {
                case 'H3':
                    return book.author === value;
                case 'H4':
                    return book.category === value;
                case 'P':
                    return book.rating.toString() === value;
                default:
                    return book;
            }
        });
        this.addedBooks = filteredBooks;
        booksState.updateListeners(filteredBooks);
        this.renderBooks();
    }
    sortSelectHandler() {
        const selectedElement = document.getElementById('sortBy');
        const selectedValue = selectedElement.value;
        const sortBooks = () => {
            switch (selectedValue) {
                case 'title':
                    console.log('sort by title');
                    return booksState.sortByTitle();
                default:
                    return this.addedBooks;
            }
        };
        const sortedBooks = sortBooks();
        booksState.updateListeners(sortedBooks);
        this.addedBooks = sortedBooks;
        console.log(this.addedBooks);
        this.renderBooks();
    }
    renderBooks() {
        const listEl = document.getElementById('books-list');
        listEl.innerHTML = '';
        for (const bookItem of this.addedBooks) {
            new BookItem(bookItem);
        }
    }
    configure() {
        this.element
            .querySelector('h2')
            .addEventListener('click', this.allBookHandler);
        this.element
            .querySelector('#sortBy')
            .addEventListener('change', this.sortSelectHandler);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.sectionTitle;
    }
    attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}
__decorate([
    Autobind
], BookList.prototype, "allBookHandler", null);
//# sourceMappingURL=book-list.js.map