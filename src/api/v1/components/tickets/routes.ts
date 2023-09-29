import {
  _delete,
  assign,
  create,
  get,
  list,
  unassign,
  update
} from './controllers';
import {
  assignValidator,
  createValidator,
  deleteValidator,
  getValidator,
  listValidator,
  unassignValidator,
  updateValidator
} from './validators';
import { Router } from 'express';

export default function () {
  const router = Router();

  router.post('/:id/assigne', assignValidator, assign);
  router.delete('/:id/assigne', unassignValidator, unassign);

  router.get('/:id', getValidator, get);
  router.patch('/:id', updateValidator, update);
  router.delete('/:id', deleteValidator, _delete);

  router.get('/', listValidator, list);
  router.post('/', createValidator, create);

  return router;
}
