const { v4: uuidv4 } = require('uuid');
export class Book {
    constructor(id, title, author, category, rating) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.rating = rating;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
export class BooksState extends State {
    constructor() {
        super();
        this.books = [];
        this.editMode = false;
        this.books = this.localBooksData;
        this.updateListeners();
    }
    get localBooksData() {
        const localBooksData = localStorage.getItem('books');
        return localBooksData ? JSON.parse(localBooksData) : [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new BooksState();
            return this.instance;
        }
    }
    get allBooks() {
        return this.books;
    }
    updateLocalStorage() {
        return localStorage.setItem('books', JSON.stringify(this.books));
    }
    switchEditMode() {
        this.editMode = !this.editMode;
    }
    returnEditMode() {
        return this.editMode;
    }
    updateListeners(items = this.books) {
        for (const listenerFn of this.listeners) {
            listenerFn(items.slice());
        }
    }
    deleteBook(id) {
        const booksUpdated = this.books.filter((book) => book.id !== id);
        this.books = booksUpdated;
        this.updateListeners();
        this.updateLocalStorage();
    }
    addBook(title, author, category, rating) {
        const id = uuidv4();
        const newBook = new Book(id, title, author, category, rating);
        this.books.push(newBook);
        this.updateListeners();
        this.updateLocalStorage();
    }
    editBook(title, author, category, rating, id) {
        const updatedBooks = this.books.map((book) => {
            const updatedBook = {
                id: book.id,
                title,
                author,
                category,
                rating,
            };
            return book.id === id ? updatedBook : book;
        });
        this.books = updatedBooks;
        this.updateListeners();
        this.updateLocalStorage();
    }
    sortByTitle() {
        return this.books.sort(this.compareTitles);
    }
    compareTitles(a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    }
}
export const booksState = BooksState.getInstance();
//# sourceMappingURL=books-state.js.map