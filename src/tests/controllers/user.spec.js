import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

const baseUrl = '/api/v1';

describe('Test User Controller', () => {
  describe('Login User', () => {
    const user = {
      email: '002@test.com',
      password: 'P@ssword123',
    };

    it('Should login user successfully', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/users/auth/login`)
        .send(user)
        .end((err, res) => {
          const { status, data } = res.body;
          res.should.have.status(200);
          status.should.equal(200);
          data.should.be.a('object');
          data.should.have.property('id');
          data.should.have.property('firstname');
          data.should.have.property('lastname');
          data.should.have.property('email');
          data.should.have.property('isAdmin');
          data.should.have.property('isActive');
          expect(data.password).to.equal(undefined);
          done();
        });
    });

    it('Should not login a user with wrong credentials', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/users/auth/login`)
        .send({ ...user, password: 'wrong_password' })
        .end((err, res) => {
          const { status, error } = res.body;

          res.should.have.status(401);
          status.should.equal(401);
          error.should.equal(
            'The email and password provided does not match our records. Please confirm and try again',
          );
          done();
        });
    });
  });

  describe('Get All Users', () => {
    it('Should get all users successfully', (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/users`)
        .end((err, res) => {
          const { status, data } = res.body;
          res.should.have.status(200);
          status.should.equal(200);
          data.should.be.a('array');
          data.forEach((datum) => {
            datum.should.have.property('id');
            datum.should.have.property('firstname');
            datum.should.have.property('lastname');
            datum.should.have.property('email');
            datum.should.have.property('isAdmin');
            datum.should.have.property('isActive');
            expect(datum.password).to.equal(undefined);
          });
          done();
        });
    });
  });

  describe('Get Specific User', () => {
    const id = 1;
    it('Should get the specified user successfully', (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/users/${id}`)
        .end((err, res) => {
          const { status, data } = res.body;
          res.should.have.status(200);
          status.should.equal(200);
          data.should.be.a('object');
          data.should.have.property('id');
          data.id.should.equal(id);
          data.should.have.property('firstname');
          data.should.have.property('lastname');
          data.should.have.property('email');
          data.should.have.property('isAdmin');
          data.should.have.property('isActive');
          expect(data.password).to.equal(undefined);
          done();
        });
    });

    it("Should return 404 for a user that's not found", (done) => {
      chai
        .request(app)
        .get(`${baseUrl}/users/${id + 2000}`)
        .end((err, res) => {
          const { status, error } = res.body;

          res.should.have.status(404);
          status.should.equal(404);
          error.should.equal('Resource Not found');
          done();
        });
    });
  });

  describe('Create User', () => {
    const user = {
      email: 'test_user@gmail.com',
      password: 'P@ssword123',
      firstname: 'test',
      lastname: 'user',
    };

    it('Should create the user successfully', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/users`)
        .send(user)
        .end((err, res) => {
          const { status, data } = res.body;
          res.should.have.status(201);
          status.should.equal(201);
          data.should.be.a('object');
          data.should.have.property('id');
          data.should.have.property('firstname');
          data.should.have.property('lastname');
          data.should.have.property('email');
          data.should.have.property('isAdmin');
          data.should.have.property('isActive');
          expect(data.password).to.equal(undefined);
          done();
        });
    });

    it('Should not create a user that already exists', (done) => {
      chai
        .request(app)
        .post(`${baseUrl}/users`)
        .send(user)
        .end((err, res) => {
          const { status, error } = res.body;

          res.should.have.status(409);
          status.should.equal(409);
          error.should.equal('User already exists');
          done();
        });
    });
  });

  describe('Delete User', () => {
    const id = 4;
    it('Should delete the specified user successfully', (done) => {
      chai
        .request(app)
        .delete(`${baseUrl}/users/${id}`)
        .end((err, res) => {
          const { status, data } = res.body;
          res.should.have.status(200);
          status.should.equal(200);
          data.should.be.a('object');
          data.should.have.property('message');
          data.message.should.equal(`User with id: ${id} deleted successfully`);
          done();
        });
    });

    it("Should return 404 for a user that's not found", (done) => {
      chai
        .request(app)
        .delete(`${baseUrl}/users/${id + 2000}`)
        .end((err, res) => {
          const { error } = res.body;

          res.should.have.status(404);
          error.should.equal('Resource Not found');
          done();
        });
    });
  });
});
