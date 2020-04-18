import Service from './Service';
import models from '../database/models';

/**
 * @class BookService
 * @description Defines standard operations to be performed on book objects
 * @exports BookService
 */
class BookService extends Service {}

export default new BookService(models.Book);
