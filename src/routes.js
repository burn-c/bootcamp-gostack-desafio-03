/* eslint-disable import/no-unresolved */
import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentsController from './app/controllers/StudentsController';
import SessionController from './app/controllers/SessionController';
import PlansController from './app/controllers/PlansController';
import RegistrationsController from './app/controllers/RegistrationsController';
import authMiddlewares from './app/middlewares/auth';
import CheckinsController from './app/controllers/CheckinsController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/students', StudentsController.store);
routes.put('/students', StudentsController.update);

// Checkins
routes.post('/students/:id/checkins', CheckinsController.store);
routes.get('/students/:id/checkins', CheckinsController.index);

routes.use(authMiddlewares);

// Plans
routes.post('/plans', PlansController.store);
routes.get('/plans', PlansController.index);
routes.put('/plans/:id', PlansController.update);
routes.delete('/plans/:id', PlansController.delete);

// Registrations
routes.post('/registrations', RegistrationsController.store);
routes.get('/registrations', RegistrationsController.index);
routes.put('/registrations/:id', RegistrationsController.update);
routes.delete('/registrations/:id', RegistrationsController.delete);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

export default routes;
