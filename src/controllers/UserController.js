import Controller from './Controller';
import { UserService, AuthService } from '../services';
import { ok, unAuthorized } from '../utils';

const { generateToken } = AuthService;

/**
 * @class UserController
 * @description Defines the business logic methods for the User model
 * @exports UserController
 */
class UserController extends Controller {
  /**
   * @description Create a UserController
   * @param {Object} Service - The service object to handle data-layer operations
   * @param {String} resourceName - the name of the resource to operate on
   * @param {Array} uniqueAttributes - an array of attributes that should be unique
   */
  constructor(Service, resourceName, uniqueAttributes) {
    super(Service, resourceName, uniqueAttributes);

    this.login = this.login.bind(this);
  }

  /**
   * @method login
   * @description Controls the user login operation
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Returns a JSON API response
   */
  async login(req, res) {
    try {
      const user = await this.Service.login(req.body);
      const token = generateToken({ id: user.id, email: user.email });
      return ok(res, { token, ...user });
    } catch ({ message }) {
      return unAuthorized(res, message);
    }
  }
}

export default new UserController(UserService, 'User', ['email']);
