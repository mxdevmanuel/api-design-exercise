import { create, get, list, update } from './controllers';
import { createValidator, getValidator, listValidator, updateValidator } from './validators';
import { Router } from 'express';

export default function () {
  const router = Router();

  router.get('/', listValidator, list);
  router.get('/:id', getValidator, get);
  router.post('/', createValidator, create);
  router.patch('/:id', updateValidator, update)

  return router;
}
