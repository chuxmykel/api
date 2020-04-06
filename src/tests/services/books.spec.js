import chai from 'chai';
import BookService from '../../services';

chai.should();

const { findAll, findById, findByTitle, create } = BookService;

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

  describe('findByTitle BookService', () => {
    it('should return the specified book', async () => {
      const data = await findByTitle('Just JavaScript');
      data.should.be.a('object');
      data.should.have.property('id');
      data.should.have.property('title');
      data.should.have.property('author');
    });
  });

  describe('create BookService', () => {
    it('should create book successfully', async () => {
      const book = await create({
        title: 'The girl in Glasses!',
        author: 'Smallie',
      });
      book.should.be.a('object');
      book.should.have.property('title');
      book.should.have.property('author');
    });
  });
});
