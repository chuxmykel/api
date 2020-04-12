import chai from 'chai';
import { UserService } from '../../services';

chai.should();
const { expect } = chai;

const { findAll, findById, findByEmail, create, login, userExists } = UserService;

describe('User Service', () => {
  describe('findAll USerService', () => {
    it('should return all users', async () => {
      const data = await findAll();
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
    });
  });

  describe('findById UserService', () => {
    it('should return the specified user', async () => {
      const data = await findById(1);
      data.should.be.a('object');
      data.should.have.property('id');
      data.should.have.property('firstname');
      data.should.have.property('lastname');
      data.should.have.property('email');
      data.should.have.property('isAdmin');
      data.should.have.property('isActive');
      expect(data.password).to.equal(undefined);
    });
  });

  describe('findByEmail UserService', () => {
    it('should return the specified user', async () => {
      const data = await findByEmail('002@test.com');
      data.should.be.a('object');
      data.should.have.property('id');
      data.should.have.property('firstname');
      data.should.have.property('lastname');
      data.should.have.property('email');
      data.should.have.property('password');
      data.should.have.property('isAdmin');
      data.should.have.property('isActive');
    });
  });

  describe('create UserService', () => {
    it('should create a user successfully', async () => {
      const user = await create({
        firstname: 'trial',
        lastname: 'account',
        email: '003@test.com',
        password: 'P@ssword123',
      });
      user.should.be.a('object');
      user.should.have.property('id');
      user.should.have.property('firstname');
      user.should.have.property('lastname');
      user.should.have.property('email');
      user.should.have.property('isAdmin');
      user.should.have.property('isActive');
      expect(user.password).to.equal(undefined);
    });
  });

  describe('login UserService', () => {
    const credentials = {
      email: '002@test.com',
      password: 'P@ssword123',
    };
    it('should login a user successfully', async () => {
      const user = await login(credentials);
      user.should.be.a('object');
      user.should.have.property('id');
      user.should.have.property('firstname');
      user.should.have.property('lastname');
      user.should.have.property('email');
      user.should.have.property('isAdmin');
      user.should.have.property('isActive');
      expect(user.password).to.equal(undefined);
    });

    it('should throw an authentication error wrong email', async () => {
      try {
        await login({ email: 'wrong_email@test.com', password: credentials.password });
      } catch ({ message }) {
        message.should.equal(
          'The email and password provided does not match our records. Please confirm and try again',
        );
      }
    });

    it('should throw an authentication error wrong password', async () => {
      try {
        await login({ email: credentials.email, password: 'WrongPassword' });
      } catch ({ message }) {
        message.should.equal(
          'The email and password provided does not match our records. Please confirm and try again',
        );
      }
    });
  });

  describe('userExists', () => {
    it('should return true for a user that exists', async () => {
      const status = await userExists('002@test.com');
      status.should.be.a('boolean');
      status.should.equal(true);
    });

    it('should return false for a user that does not exist', async () => {
      const status = await userExists('doesnotexist@test.com');
      status.should.be.a('boolean');
      status.should.equal(false);
    });
  });
});
