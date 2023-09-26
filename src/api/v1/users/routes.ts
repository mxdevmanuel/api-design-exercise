import { Router } from 'express';
import { UserController } from './controller';
import { container } from 'tsyringe';

export default function () {
  const userController = container.resolve(UserController);

  const router = Router();

  router.get('/all', (req, res) => userController.getAll(req, res));
  return router;
}
