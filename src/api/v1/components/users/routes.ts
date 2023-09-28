import { _delete ,create, get, list, update } from './controllers';
import { createValidator, deleteValidator, getValidator, listValidator, updateValidator } from './validators';
import { Router } from 'express';

export default function () {
  const router = Router();

  router.get('/', listValidator, list);
  router.get('/:id', getValidator, get);
  router.post('/', createValidator, create);
  router.patch('/:id', updateValidator, update)
  router.delete('/:id', deleteValidator, _delete)

  return router;
}
