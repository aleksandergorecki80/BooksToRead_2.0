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
  protected listeners: Listeners<T>[] = [];

  addListener(listenerFn: Listeners<T>) {
    this.listeners.push(listenerFn);
  }
}

export class BooksState extends State<Book> {
  private books: Book[] = [];
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

  updateLocalStorage() {
    return localStorage.setItem('books', JSON.stringify(this.books));
  }

  updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.books.slice());
    }
  }

  addBook(title: string, author: string, category: string, rating: number) {
    const id = uuidv4();
    const newBook = new Book(id, title, author, category, rating);
    this.books.push(newBook);
    this.updateListeners();
    this.updateLocalStorage();
  }
}

export const booksState = BooksState.getInstance();
