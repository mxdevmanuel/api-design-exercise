import { create, list } from './controllers';
import { createValidator, listValidator } from './validators';
import { Router } from 'express';

export default function () {
  const router = Router();

  router.get('/', listValidator, list);
  router.post('/', createValidator, create);

  return router;
}
