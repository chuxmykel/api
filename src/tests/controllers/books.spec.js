import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();
chai.use(chaiHttp);
const baseUrl = '/api/v1';

describe('Test Book Controller', () => {
  describe('Get All Books', () => {
    it('Should get all books successfully', (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/books`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.forEach((item) => {
            item.should.have.property('id');
            item.should.have.property('title');
            item.should.have.property('author');
            item.should.have.property('published');
          });
          done();
        });
    });
  });

  describe('Get Specific Book', () => {
    const id = 1;
    it('Should get the specified book successfully', (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/books/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.forEach((item) => {
            item.should.have.property('id');
            item.id.should.equal(id);
            item.should.have.property('title');
            item.should.have.property('author');
            item.should.have.property('published');
          });
          done();
        });
    });

    it("Should return 404 for a book that's not found", (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/books/${id + 2000}`)
        .end((err, res) => {
          const { error } = res.body;

          res.should.have.status(404);
          error.should.equal('Resource Not found');
          done();
        });
    });
  });

  describe('Create Book', () => {
    const book = {
      title: 'The girl in Glasses!',
      author: 'Smallie',
      published: '2022',
    };

    it('Should create the book successfully', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/books`)
        .send(book)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('title');
          res.body.should.have.property('author');
          res.body.should.have.property('published');
          done();
        });
    });

    it('Should not create a book that already exists', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/books`)
        .send(book)
        .end((err, res) => {
          const { error } = res.body;

          res.should.have.status(409);
          error.should.equal('Book already exists');
          done();
        });
    });
  });

  describe('Delete Book', () => {
    const id = 2;
    it('Should delete the specified book successfully', (done) => {
      chai
        .request(app)
        .delete(`${baseUrl}/books/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.equal(`Book with id: ${id} deleted successfully`);
          done();
        });
    });

    it("Should return 404 for a book that's not found", (done) => {
      chai
        .request(app)
        .delete(`${baseUrl}/books/${id + 2000}`)
        .end((err, res) => {
          const { error } = res.body;

          res.should.have.status(404);
          error.should.equal('Resource Not found');
          done();
        });
    });
  });
});
