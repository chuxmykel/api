import BookService from '../services';
import Response from '../utils';

const { ok, created, conflict, notFound } = Response;
const { findAll, findById, findByTitle, create, deleteBook } = BookService;

class BookController {
  static create(req, res) {
    const { title, author, published } = req.body;

    if (findByTitle(title).length > 0) return conflict(res, 'Book already exists');
    return created(res, create({ title, author, published }));
  }

  static findById(req, res) {
    return ok(res, findById(req.params.id)) || notFound(res);
  }

  static findAll(_req, res) {
    return ok(res, findAll());
  }

  static deleteBook(req, res) {
    if (findById(req.params.id).length < 1) return notFound(res);
    deleteBook(req.params.id);
    return ok(res, { message: `Book with id: ${req.params.id} deleted successfully` });
  }
}

export default BookController;
