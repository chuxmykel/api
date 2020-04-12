import { UserService, AuthService } from '../services';
import { ok, created, conflict, notFound, unAuthorized } from '../utils';

const { findAll, findById, findByEmail, create, destroy, login } = UserService;
const { generateToken } = AuthService;

/**
 * @class UserController
 * @description Defines the business logic methods for the User model
 * @exports UserController
 */
class UserController {
  /**
   * @method login
   * @description Controls the user login operation
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Returns a JSON API response
   */
  static async login(req, res) {
    try {
      const user = await login(req.body);
      const token = generateToken({ id: user.id, email: user.email });
      return ok(res, { token, ...user });
    } catch ({ message }) {
      return unAuthorized(res, message);
    }
  }

  /**
   * @method create
   * @description Controls the user creation operation
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Returns a JSON API response
   */
  static async create(req, res) {
    const { email } = req.body;

    if (await findByEmail(email)) return conflict(res, 'User already exists');
    return created(res, await create(req.body));
  }

  /**
   * @method findById
   * @description Gets a User by their ID
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Returns a JSON API response
   */
  static async findById(req, res) {
    const user = await findById(req.params.id);
    return user ? ok(res, user) : notFound(res);
  }

  /**
   * @method findAll
   * @description Fetches all users
   * @param {object} _req - The request object
   * @param {object} res - The response object
   * @returns {object} Returns a JSON API response
   */
  static async findAll(_req, res) {
    return ok(res, await findAll());
  }

  /**
   * @method delete
   * @description Deletes a user
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Returns a JSON API response
   */
  static async deleteUser(req, res) {
    if (!(await findById(req.params.id))) return notFound(res);
    destroy(req.params.id);
    return ok(res, { message: `User with id: ${req.params.id} deleted successfully` });
  }
}

export default UserController;
