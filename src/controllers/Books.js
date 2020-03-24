import BookService from '../services';
import { ok, created, conflict, notFound } from '../utils';

const { findAll, findById, findByTitle, create, deleteBook } = BookService;

class BookController {
  static create(req, res) {
    const { title, author, published } = req.body;

    if (findByTitle(title)) return conflict(res, 'Book already exists');
    return created(res, create({ title, author, published }));
  }

  static findById(req, res) {
    const book = findById(req.params.id);
    return book ? ok(res, book) : notFound(res);
  }

  static findAll(_req, res) {
    return ok(res, findAll());
  }

  static deleteBook(req, res) {
    if (!findById(req.params.id)) return notFound(res);
    deleteBook(req.params.id);
    return ok(res, { message: `Book with id: ${req.params.id} deleted successfully` });
  }
}

export default BookController;
