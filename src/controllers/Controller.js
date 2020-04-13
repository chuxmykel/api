import { ok, created, notFound } from '../utils';

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
   */
  constructor(Service, resourceName) {
    this.Service = Service;
    this.resourceName = resourceName;

    this.create = this.create.bind(this);
    this.findById = this.findById.bind(this);
    this.findAll = this.findAll.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
   * @method create
   * @description Controls the resource creation operation
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Returns a JSON API response
   */
  async create(req, res) {
    return created(res, await this.Service.create(req.body));
  }

  /**
   * @method findById
   * @description Gets a resource by it's ID
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Returns a JSON API response
   */
  async findById(req, res) {
    const data = await this.Service.findById(req.params.id);
    return data ? ok(res, data) : notFound(res);
  }

  /**
   * @method findAll
   * @description Fetches all resources
   * @param {object} _req - The request object
   * @param {object} res - The response object
   * @returns {object} Returns a JSON API response
   */
  async findAll(_req, res) {
    return ok(res, await this.Service.findAll());
  }

  /**
   * @method destroy
   * @description Deletes a resource
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Returns a JSON API response
   */
  async destroy(req, res) {
    if (!(await this.Service.findById(req.params.id))) return notFound(res);
    this.Service.destroy(req.params.id);
    return ok(res, {
      message: `${this.resourceName} with id: ${req.params.id} deleted successfully`,
    });
  }
}

export default Controller;
