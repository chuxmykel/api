import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const secretKey = process.env.SECRET_KEY;

/**
 * @class AuthService
 * @description Defines standard helper methods for authentication
 * @exports AuthService
 */
class AuthService {
  /**
   * @method generateToken
   * @description Generates a json web token
   * @param {object} payload - The payload for generating the token
   * @returns {string} A string which is the token
   */
  static generateToken(payload) {
    return jwt.sign(payload, secretKey, {
      expiresIn: 60 * 10,
    }); // TODO: Reduce validity time and use refresh tokens
  }

  /**
   * @method verifyToken
   * @description Verifies that the token is valid
   * @param {String} token - The token to verify
   * @returns {JSON} JSON API Response
   */
  static verifyToken(token) {
    return jwt.verify(token, secretKey);
  }

  /**
   * @method hashString
   * @description Hashes a plain text string
   * @param {String} string - The plain text string to be hashed
   * @returns {string} The hash string
   */
  static hashString(string) {
    return bcrypt.hashSync(string, 10);
  }

  /**
   * @method verifyHash
   * @description compares plain strings to hashed strings for authentication
   * @param {string} plainTextString - The plain text string to be verified
   * @param {string} hashedString - Stored hashed string to compare against
   * @returns {boolean} Booelean indicating success or failure
   */
  static verifyHash(plainTextString, hashedString) {
    return bcrypt.compareSync(plainTextString, hashedString);
  }

  /**
   * @method authError
   * @description A simple authentication error
   * @returns {Error} A new error object with the auth error message
   */
  static authError() {
    return new Error(
      'The email and password provided does not match our records. Please confirm and try again',
    );
  }
}

export default AuthService;
