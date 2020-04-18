import Controller from './Controller';
import { BookService } from '../services';

/**
 * @class BookController
 * @description Defines the business logic methods for the Book model
 * @exports BookController
 */
class BookController extends Controller {}

export default new BookController(BookService, 'Book', ['title']);
