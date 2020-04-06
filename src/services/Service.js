/**
 * @class Service
 * @description Defines standard operations to be performed on model objects
 * @exports Service
 */
class Service {
  /**
   * @description Create a Service
   * @param {Object} Model - The model object to operate on
   */
  constructor(Model) {
    this.Model = Model;
    this.findById = this.findById.bind(this);
    this.findAll = this.findAll.bind(this);
    this.create = this.create.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
   * @method create
   * @description Creates a new resource of the given model
   * @param {object} data - The details of the resource to create
   * @returns {object} Returns the newly created resource
   */
  create(data) {
    return this.Model.create(data);
  }

  /**
   * @method findById
   * @description Returns a resource of the given id
   * @param {Number} id - The ID of the resource to return
   * @returns {object} Returns the found resource
   */
  findById(id) {
    return this.Model.findByPk(id);
  }

  /**
   * @method findAll
   * @description Returns all resources of a given model
   * @returns {object} Returns all resources found
   */
  findAll() {
    return this.Model.findAll();
  }

  /**
   * @method destroy
   * @description deletes a specific resource
   * @param {Number} id - The ID of the resource to delete
   * @returns {undefined}
   */
  destroy(id) {
    this.Model.destroy({
      where: { id },
    });
  }
}

export default Service;
