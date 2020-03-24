class Response {
  static ok(res, data) {
    return Response.success(res, 200, data);
  }

  static created(res, data) {
    return Response.success(res, 201, data);
  }

  static notFound(res) {
    return Response.error(res, 404, 'Resource Not found');
  }
  
  static conflict(res, error) {
    return Response.error(res, 409, error);
  }

  static success(res, status, data) {
    return res.status(status).json(data);
  }

  static error(res, status, error) {
    return res.status(status).json({ error });
  }
}

export default Response;
