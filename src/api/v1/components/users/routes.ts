import { create, get, list } from './controllers';
import { createValidator, getValidator, listValidator } from './validators';
import { Router } from 'express';

export default function () {
  const router = Router();

  router.get('/', listValidator, list);
  router.get('/:id', getValidator, get);
  router.post('/', createValidator, create);

  return router;
}
