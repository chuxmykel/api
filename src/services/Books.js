/**
 * @class BookService
 * @description Defines standard operations to be performed on book objects
 * @exports BookService
 */
class BookService {
  /**
   * @description Create a BookService
   */
  constructor() {
    this.books = [
      {
        id: 1,
        title: 'Chinwe stays with Chux',
        author: 'Chiiiiiiiiiii',
        published: '2020',
      },
      {
        id: 2,
        title: 'Trash',
        author: 'Trash Guy',
        published: '2018',
      },
      {
        id: 3,
        title: 'Just JavaScript',
        author: 'Dan Abramov',
        published: '2020',
      },
    ];

    this.findById = this.findById.bind(this);
    this.findAll = this.findAll.bind(this);
    this.create = this.create.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }

  /**
   * @method create
   * @description Creates a new book
   * @param {object} data - The details of the book to create
   * @returns {object} Returns the newly created book
   */
  create(data) {
    const normalizedData = { id: this.books.length + 1, ...data };
    this.books.push(normalizedData);
    return normalizedData;
  }

  /**
   * @method findById
   * @description Returns a book with the given id
   * @param {String} title - The title of the book to return
   * @returns {object} Returns the book if found
   */
  findByTitle(title) {
    const foundBook = this.books.filter((book) => book.title === title);
    return foundBook.length > 0 ? foundBook : null;
  }

  /**
   * @method findById
   * @description Returns a book of the given id
   * @param {Number} id - The ID of the book to return
   * @returns {object} Returns the found book
   */
  findById(id) {
    const foundBook = this.books.filter((book) => book.id === parseInt(id, 10));
    return foundBook.length > 0 ? foundBook : null;
  }

  /**
   * @method findAll
   * @description Find all books
   * @returns {object} Returns all books found
   */
  findAll() {
    return this.books;
  }

  /**
   * @method delete
   * @description Deletes a book
   * @param {Number} id - The ID of the book to delete
   * @returns {undefined}
   */
  deleteBook(id) {
    this.books = this.books.filter((book) => book.id !== parseInt(id, 10));
  }
}

export default new BookService();
