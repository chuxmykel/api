import chai from 'chai';
import { AuthService } from '../../services';

chai.should();

const { generateToken, verifyToken, hashString, verifyHash, authError } = AuthService;

describe('Auth Service', () => {
  const user = {
    name: 'John Doe',
    age: 20,
  };
  let token;
  let hash;
  describe('generateToken', () => {
    it('should generate a token successfully', () => {
      token = generateToken(user);
      token.should.be.a('string');
      token.split('.').length.should.equal(3);
    });
  });

  describe('verifyToken', () => {
    it('should verify token successfully', () => {
      const data = verifyToken(token);
      data.should.be.a('object');
      data.should.have.property('name');
      data.should.have.property('age');
      data.should.have.property('iat');
      data.should.have.property('exp');
    });
  });

  describe('hashString', () => {
    it('should convert plain string to a hash', () => {
      hash = hashString('JustJavaScript');
      hash.should.be.a('string');
    });
  });

  describe('verifyHash', () => {
    it('should verify hash successfully', () => {
      verifyHash('JustJavaScript', hash).should.equal(true);
    });

    it('should detect wrong plain strings', () => {
      verifyHash('JustJavaScrip', hash).should.equal(false);
    });
  });

  describe('authError', () => {
    it('should return a new error object with the predefined error message', () => {
      try {
        authError();
      } catch ({ message }) {
        message.should.equal(
          'The email and password provided does not match our records. Please confirm and try again',
        );
      }
    });
  });
});
