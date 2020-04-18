import { ok, created, conflict, notFound, serverError } from '../utils';

/**
 * @class Controller
 * @description Defines the business logic methods common to all controllers
 * @exports Controller
 */
class Controller {
  /**
   * @description Create a Controller
   * @param {Object} Service - The service object to handle data-layer operations
   * @param {String} resourceName - the name of the resource to operate on
   * @param {Array} uniqueAttributes - an array of attributes that should be unique
   */
  constructor(Service, resourceName, uniqueAttributes) {
    this.Service = Service;
    this.resourceName = resourceName;
    this.uniqueAttributes = uniqueAttributes;

    this.create = this.create.bind(this);
    this.findById = this.findById.bind(this);
    this.findAll = this.findAll.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
   * @method create
   * @description Controls the resource creation operation
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} Returns a JSON API response
   */
  async create(req, res) {
    const uniqueAttributes = {};
    this.uniqueAttributes.forEach((attribute) => {
      uniqueAttributes[attribute] = req.body[attribute];
    });
    try {
      return created(res, await this.Service.create(req.body, uniqueAttributes));
    } catch (error) {
      if (error.message === 'Resource already exists') {
        return conflict(res, `${this.resourceName} already exists`);
      }
      return serverError(res, error.message);
    }
  }

  /**
   * @method findById
   * @description Gets a resource by it's ID
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} Returns a JSON API response
   */
  async findById(req, res) {
    const data = await this.Service.findById(req.params.id);
    return data ? ok(res, data) : notFound(res);
  }

  /**
   * @method findAll
   * @description Fetches all resources
   * @param {Object} _req - The request object
   * @param {Object} res - The response object
   * @returns {Object} Returns a JSON API response
   */
  async findAll(_req, res) {
    return ok(res, await this.Service.findAll());
  }

  /**
   * @method destroy
   * @description Deletes a resource
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} Returns a JSON API response
   */
  async destroy(req, res) {
    const { id } = req.params;
    if ((await this.Service.exists({ id })) === false) return notFound(res);
    this.Service.destroy(req.params.id);
    return ok(res, {
      message: `${this.resourceName} with id: ${req.params.id} deleted successfully`,
    });
  }
}

export default Controller;
