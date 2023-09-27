import { create, list } from './controllers';
import { Router } from 'express';
import { createValidator } from "./validators";

export default function () {
  const router = Router();

  router.get('/', list);
  router.post('/', createValidator, create);

  return router;
}
