import Controller from './Controller';
import { BookService } from '../services';
import { conflict } from '../utils';
/**
 * @class BookController
 * @description Defines the business logic methods for the Book model
 * @exports BookController
 */
class BookController extends Controller {
  /**
   * @description Create a BookController
   * @param {Object} Service - The service object to handle data-layer operations
   * @param {String} resourceName - the name of the resource to operate on
   */
  constructor(Service, resourceName) {
    super(Service, resourceName);

    this.create = this.create.bind(this);
  }

  /**
   * @method create
   * @description Controls the book creation operation
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Returns a JSON API response
   */
  async create(req, res) {
    return (await this.Service.findByTitle(req.body.title))
      ? conflict(res, 'Book already exists')
      : super.create(req, res);
  }
}

export default new BookController(BookService, 'Book');
