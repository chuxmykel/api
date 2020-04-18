import chai from 'chai';
import { BookService } from '../../services';

chai.should();

const { findAll, findById, create, exists } = BookService;

describe('Book Service', () => {
  describe('findAll BookService', () => {
    it('should return all books', async () => {
      const data = await findAll();
      data.should.be.a('array');
      data.forEach((datum) => {
        datum.should.have.property('id');
        datum.should.have.property('title');
        datum.should.have.property('author');
      });
    });
  });

  describe('findById BookService', () => {
    it('should return the specified book', async () => {
      const data = await findById(1);
      data.should.be.a('object');
      data.should.have.property('id');
      data.should.have.property('title');
      data.should.have.property('author');
    });
  });

  describe('create BookService', () => {
    const bookDetails = {
      title: 'The girl in Glasses!',
      author: 'Smallie',
    };

    it('should create book successfully', async () => {
      const { title } = bookDetails;
      const book = await create(bookDetails, { title });
      book.should.be.a('object');
      book.should.have.property('title');
      book.should.have.property('author');
    });

    it('should not create a book that already exists', async () => {
      const { title } = bookDetails;
      try {
        await create(bookDetails, { title });
      } catch (error) {
        error.message.should.equal('Resource already exists');
      }
    });
  });

  describe('exists', () => {
    it('should return true for a book that exists', async () => {
      const title = 'The girl in Glasses!';
      const status = await exists({ title });
      status.should.be.a('boolean');
      status.should.equal(true);
    });

    it('should return false for a book that does not exist', async () => {
      const title = 'The girl not in Glasses!';
      const status = await exists({ title });
      status.should.be.a('boolean');
      status.should.equal(false);
    });
  });
});
