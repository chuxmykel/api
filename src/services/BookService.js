import Service from './Service';
import models from '../database/models';

/**
 * @class BookService
 * @description Defines standard operations to be performed on book objects
 * @exports BookService
 */
class BookService extends Service {
  /**
   * @description Create a BookService
   * @param {Object} Book - The book model
   */
  constructor(Book) {
    super(Book);
    this.Book = Book;
    this.findByTitle = this.findByTitle.bind(this);
  }

  /**
   * @method findByTitle
   * @description Finds a book with the given title
   * @param {String} title - The title of the book to find
   * @returns {object} Returns the found book
   */
  findByTitle(title) {
    return this.Book.findOne({
      where: { title },
    });
  }
}

export default new BookService(models.Book);
