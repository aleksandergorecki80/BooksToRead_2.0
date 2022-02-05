const { v4: uuidv4 } = require('uuid');

// Book type
export class Book {
  constructor(
    public id: string,
    public title: string,
    public author: string,
    public category: string,
    public rating: number
  ) {}
}

type Listeners<T> = (items: T[]) => void;

class State<T> {
  // protected listeners: Listeners<T>[] = [];
  listeners: Listeners<T>[] = [];

  addListener(listenerFn: Listeners<T>) {
    this.listeners.push(listenerFn);
  }
}

export class BooksState extends State<Book> {
  private books: Book[] = [];
  private editMode: boolean = false;
  private static instance: BooksState;

  get localBooksData() {
    const localBooksData = localStorage.getItem('books');
    return localBooksData ? JSON.parse(localBooksData) : [];
  }

  private constructor() {
    super();
    this.books = this.localBooksData;
    this.updateListeners();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
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

  updateListeners(items: Book[] = this.books) {
    for (const listenerFn of this.listeners) {
      listenerFn(items.slice());
    }
  }

  deleteBook(id: string): void {
    const booksUpdated: Book[] = this.books.filter((book) => book.id !== id);
    this.books = booksUpdated;

    this.updateListeners();
    this.updateLocalStorage();
  }

  addBook(title: string, author: string, category: string, rating: number) {
    const id = uuidv4();
    const newBook = new Book(id, title, author, category, rating);
    this.books.push(newBook);
    this.updateListeners();
    this.updateLocalStorage();
  }

  editBook(
    title: string,
    author: string,
    category: string,
    rating: number,
    id: string | undefined
  ) {
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

  sortBy(option: string | number) {
    return this.books.sort((a: Book, b: Book) => {
      if (a[option as keyof Book] < b[option as keyof Book]) {
        return 1;
      }
      if (a[option as keyof Book] > b[option as keyof Book]) {
        return -1;
      }
      return 0;
    });
  }
}

export const booksState = BooksState.getInstance();
