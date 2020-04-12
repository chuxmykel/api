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
          const { status, data } = res.body;
          res.should.have.status(200);
          status.should.equal(200);
          data.should.be.a('array');
          data.forEach((datum) => {
            datum.should.have.property('id');
            datum.should.have.property('title');
            datum.should.have.property('author');
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
          const { status, data } = res.body;
          res.should.have.status(200);
          status.should.equal(200);
          data.should.be.a('object');
          data.should.have.property('id');
          data.id.should.equal(id);
          data.should.have.property('title');
          data.should.have.property('author');
          done();
        });
    });

    it("Should return 404 for a book that's not found", (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/books/${id + 2000}`)
        .end((err, res) => {
          const { status, error } = res.body;

          res.should.have.status(404);
          status.should.equal(404);
          error.should.equal('Resource Not found');
          done();
        });
    });
  });

  describe('Create Book', () => {
    const book = {
      title: 'The girl in Glasses!',
      author: 'Smallie',
    };

    it('Should create the book successfully', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/books`)
        .send(book)
        .end((err, res) => {
          const { status, data } = res.body;
          res.should.have.status(201);
          status.should.equal(201);
          data.should.be.a('object');
          data.should.have.property('id');
          data.should.have.property('title');
          data.should.have.property('author');
          done();
        });
    });

    it('Should not create a book that already exists', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/books`)
        .send(book)
        .end((err, res) => {
          const { status, error } = res.body;

          res.should.have.status(409);
          status.should.equal(409);
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
          const { status, data } = res.body;
          res.should.have.status(200);
          status.should.equal(200);
          data.should.be.a('object');
          data.should.have.property('message');
          data.message.should.equal(`Book with id: ${id} deleted successfully`);
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
