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

export class BooksState {
  private listeners: any[] = [];
  private projects: Book[] = [];
  private static instance: BooksState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new BooksState();
      return this.instance;
    }
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
    console.log(this.listeners);
  }

  addBook(title: string, author: string, category: string, rating: number) {
    const id = uuidv4();
    const newBook = new Book(id, title, author, category, rating);
    this.projects.push(newBook);
    for (const listenerFn of this.listeners) {
      console.log(listenerFn);
      listenerFn(this.projects.slice());
    }
    console.log(this.listeners);
  }
}

export const booksState = BooksState.getInstance();
