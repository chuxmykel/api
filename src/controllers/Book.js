import { BookService } from '../services';
import { ok, created, conflict, notFound } from '../utils';

const { findAll, findById, findByTitle, create, destroy } = BookService;

/**
 * @class BookController
 * @description Defines the business logic methods for the Book model
 * @exports BookController
 */
class BookController {
  /**
   * @method create
   * @description Controls the book creation operation
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Returns a JSON API response
   */
  static async create(req, res) {
    const { title, author } = req.body;

    if (await findByTitle(title)) return conflict(res, 'Book already exists');
    return created(res, await create({ title, author }));
  }

  /**
   * @method findById
   * @description Gets a book by it's ID
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Returns a JSON API response
   */
  static async findById(req, res) {
    const book = await findById(req.params.id);
    return book ? ok(res, book) : notFound(res);
  }

  /**
   * @method findAll
   * @description Fetches all books
   * @param {object} _req - The request object
   * @param {object} res - The response object
   * @returns {object} Returns a JSON API response
   */
  static async findAll(_req, res) {
    return ok(res, await findAll());
  }

  /**
   * @method delete
   * @description Deletes a book
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Returns a JSON API response
   */
  static async deleteBook(req, res) {
    if (!(await findById(req.params.id))) return notFound(res);
    destroy(req.params.id);
    return ok(res, { message: `Book with id: ${req.params.id} deleted successfully` });
  }
}

export default BookController;
