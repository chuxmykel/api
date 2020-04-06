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
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.message.should.equal('Hello, World!');
        done();
      });
  });
  it('Should return success on hitting home route', (done) => {
    chai
      .request(app)
      .get(`${baseUrl}/`)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.message.should.equal('Hello, World!');
        done();
      });
  });
});
