import { BookInput } from './components/book-input';
import { BookList } from './components/book-list';
import './style/index.scss';

export const bookList = new BookList('All titles');
export const bookInput = new BookInput();
