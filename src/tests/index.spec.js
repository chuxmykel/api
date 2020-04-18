import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();
chai.use(chaiHttp);
const baseUrl = '/api/v1';

describe('Test Book APIs', () => {
  it("Should redirect to /api/v1 on hitting '/' route", (done) => {
    chai
      .request(app)
      .get('/')
      .end((_err, res) => {
        const { status, data } = res.body;
        res.should.have.status(200);
        status.should.equal(200);
        data.should.be.a('object');
        data.should.have.property('status');
        data.should.have.property('message');
        data.message.should.equal('Hello, World!');
        done();
      });
  });

  it('Should return success on hitting home route', (done) => {
    chai
      .request(app)
      .get(`${baseUrl}/`)
      .end((_err, res) => {
        const { status, data } = res.body;
        res.should.have.status(200);
        status.should.equal(200);
        data.should.be.a('object');
        data.should.have.property('status');
        data.should.have.property('message');
        data.message.should.equal('Hello, World!');
        done();
      });
  });

  it('Should return a 404 error on hitting a non-existent route', (done) => {
    chai
      .request(app)
      .get(`${baseUrl}/non-existent`)
      .end((_err, res) => {
        const { status, error } = res.body;
        res.should.have.status(404);
        status.should.equal(404);
        error.message.should.equal('Resource not found. Double check the url and try again');
        done();
      });
  });
});
