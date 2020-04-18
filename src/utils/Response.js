/**
 * @class Response
 * @description Contains http Response methods
 * @exports Response
 */
class Response {
  /**
   * @method ok
   * @description HTTP 200 Ok response
   * @param {object} res - The response object from express
   * @param {object} data - The data to be sent alongside the response
   * @returns {json} JSON server response
   */
  static ok(res, data) {
    return Response.success(res, 200, data);
  }

  /**
   * @method created
   * @description HTTP 201 Created response
   * @param {object} res - The response object from express
   * @param {object} data - The data to be sent alongside the response
   * @returns {json} JSON server response
   */
  static created(res, data) {
    return Response.success(res, 201, data);
  }

  /**
   * @method badRequest
   * @description HTTP 400 Bad Request response
   * @param {object} res - The response object from express
   * @param {String} error - The error message to send in the response
   * @returns {json} JSON server response
   */
  static badRequest(res, error) {
    return Response.error(res, 400, error);
  }

  /**
   * @method unAuthorized
   * @description HTTP 401 unauthorized response
   * @param {object} res - The response object from express
   * @param {String} error - The error message to send in the response
   * @returns {json} JSON server response
   */
  static unAuthorized(res, error) {
    return Response.error(res, 401, error);
  }

  /**
   * @method notFound
   * @description HTTP 404 Resource Not Found response
   * @param {object} res - The response object from express
   * @returns {json} JSON server response
   */
  static notFound(res) {
    return Response.error(res, 404, 'Resource Not found');
  }

  /**
   * @method conflict
   * @description HTTP 409 conflict response
   * @param {object} res - The response object from express
   * @param {String} error - The error message to send in the response
   * @returns {json} JSON server response
   */
  static conflict(res, error) {
    return Response.error(res, 409, error);
  }

  /**
   * @method serverError
   * @description HTTP 500 serverError response
   * @param {object} res - The response object from express
   * @param {String} error - The error message to send in the response
   * @returns {json} JSON server response
   */
  static serverError(res, error) {
    return Response.error(res, 500, error);
  }

  /**
   * @method success
   * @description A generic method to format success responses
   * @param {object} res - The response object from express
   * @param {Number} status - The http status code
   * @param {object} data - The data to be formatted for the response
   * @returns {json} Formatted JSON server response
   */
  static success(res, status, data) {
    return res.status(status).json({ status, data });
  }

  /**
   * @method error
   * @description A generic method to format error responses
   * @param {object} res - The response object from express
   * @param {Number} status - The http status code
   * @param {String} error - The error message to send in the response
   * @returns {json} Formatted JSON server response
   */
  static error(res, status, error) {
    return res.status(status).json({ status, error });
  }
}

export default Response;
