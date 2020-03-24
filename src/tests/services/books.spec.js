import chai from 'chai';
import BookService from '../../services';

chai.should();

const { findAll, findById, findByTitle, create } = BookService;

describe('Book Service', () => {
  describe('findAll BookService', () => {
    it('should return all books', () => {
      findAll().should.be.a('array');
      findAll()[0].should.have.property('title');
      findAll()[0].should.have.property('author');
      findAll()[0].should.have.property('published');
    });
  });

  describe('findById BookService', () => {
    it('should return the specified book', () => {
      findById(1).should.be.a('array');
      findById(1)[0].should.have.property('title');
      findById(1)[0].should.have.property('author');
      findById(1)[0].should.have.property('published');
    });
  });

  describe('findByTitle BookService', () => {
    it('should return the specified book', () => {
      findByTitle('Just JavaScript').should.be.a('array');
      findByTitle('Just JavaScript')[0].should.have.property('title');
      findByTitle('Just JavaScript')[0].should.have.property('author');
      findByTitle('Just JavaScript')[0].should.have.property('published');
    });
  });

  describe('create BookService', () => {
    it('should create book successfully', () => {
      const book = {
        title: 'The girl in Glasses!',
        author: 'Smallie',
        published: '2022',
      };
      const newBook = create(book);
      newBook.should.be.a('object');
      newBook.should.have.property('title');
      newBook.should.have.property('author');
      newBook.should.have.property('published');
    });
  });
});
