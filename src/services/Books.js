class BookService {
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

  create(data) {
    data.id = this.books.length + 1;
    this.books.push(data);
    return data;
  }

  findByTitle(title) {
    return this.books.filter(book => book.title === title);
  }

  findById(id) {
    return this.books.filter(book => book.id === parseInt(id));
  }

  findAll() {
    return this.books;
  }

  deleteBook(id) {
    this.books = this.books.filter(book => book.id !== parseInt(id));
  }
}

export default new BookService();
