import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentsController from './app/controllers/StudentsController';
import SessionController from './app/controllers/SessionController';
import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/students', StudentsController.store);
routes.put('/students', StudentsController.update);

routes.use(authMiddlewares);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

export default routes;
