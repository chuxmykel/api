import Service from './Service';
import AuthService from './AuthService';
import models from '../database/models';

const { verifyHash, authError } = AuthService;

/**
 * @class UserService
 * @description Defines standard operations to be performed on User objects
 * @exports UserService
 */
class UserService extends Service {
  /**
   * @description Create a UserService
   * @param {Object} User - The user model
   */
  constructor(User) {
    super(User);
    this.User = User;
    this.findByEmail = this.findByEmail.bind(this);
    this.login = this.login.bind(this);
    this.userExists = this.userExists.bind(this);
  }

  /**
   * @method create
   * @description Creates a new user
   * @param {Object} details - The user details
   * @returns {Object} Returns the newly created resource
   */
  async create(details) {
    const user = await super.create(details);
    return UserService.serialize(user.dataValues);
  }

  /**
   * @method findById
   * @description Finds a user by their ID
   * @param {Number} id - The ID of the user to find
   * @returns {object} Returns the found user
   */
  async findById(id) {
    const user = await super.findById(id);
    return !user ? null : UserService.serialize(user.dataValues);
  }

  /**
   * @method findAll
   * @description Fetches all users
   * @returns {object} Returns the found users
   */
  findAll() {
    const users = super.findAll();
    return users.map((user) => UserService.serialize(user.dataValues));
  }

  /**
   * @method findByEmail
   * @description Finds a user with the given email
   * @param {String} email - The email of the user to find
   * @returns {Object} Returns the found User
   */
  findByEmail(email) {
    return this.User.findOne({
      where: { email },
    });
  }

  /**
   * @method login
   * @description Logs in a user and returns relevant data
   * @param {Object} credentials - The email and password of the user to login
   * @returns {Object} Returns the logged in user details and a token
   */
  async login({ email, password }) {
    const user = await this.findByEmail(email);
    if (!user) throw authError();
    if (!verifyHash(password, user.password)) throw authError();
    return UserService.serialize(user.dataValues);
  }

  /**
   * @method userExists
   * @description Checks if a user exists
   * @param {String} email - The email of the user to check
   * @returns {Object} Returns a boolean indicating if the user exists
   */
  async userExists(email) {
    const user = await this.findByEmail(email);
    return user !== null;
  }

  /**
   * @method serialize
   * @description Serializes the user object
   * @param {Object} user - The user object to serialize
   * @returns {Object} Returns the serialized user object
   */
  static serialize(user) {
    const serializedUser = user;
    delete serializedUser.password;
    return serializedUser;
  }
}

export default new UserService(models.User);
