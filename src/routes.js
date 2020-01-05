/* eslint-disable import/no-unresolved */
import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentsController from './app/controllers/StudentsController';
import SessionController from './app/controllers/SessionController';
import PlansController from './app/controllers/PlansController';
import RegistrationsController from './app/controllers/RegistrationsController';
import authMiddlewares from './app/middlewares/auth';
import CheckinsController from './app/controllers/CheckinsController';
import HelpOrdersController from './app/controllers/HelpOrdersController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

// Checkins
routes.post('/students/:id/checkins', CheckinsController.store);
routes.get('/students/:id/checkins', CheckinsController.index);

// Help Orders List student
routes.get('/students/:id/help_orders', StudentsController.index);
routes.post('/students/:id/help_orders', HelpOrdersController.store);

routes.use(authMiddlewares);

routes.post('/students', StudentsController.store);
routes.put('/students', StudentsController.update);
routes.get('/students/:page?', StudentsController.index);
routes.get('/students/:id', StudentsController.index);
routes.delete('/students/:id', StudentsController.delete);
routes.get('/students/:id/edit', StudentsController.edit);

// Help Orders - Answers
routes.put('/help_orders/:id/answer', HelpOrdersController.update);
routes.get('/help_orders/list/:page?', HelpOrdersController.index);

// Plans
routes.post('/plans', PlansController.store);
routes.get('/plans/:page?', PlansController.index);
routes.put('/plans/:id', PlansController.update);
routes.delete('/plans/:id', PlansController.delete);

// Registrations
routes.post('/registrations', RegistrationsController.store);
routes.get('/registrations/:page?', RegistrationsController.index);
routes.put('/registrations/:id', RegistrationsController.update);
routes.delete('/registrations/:id', RegistrationsController.delete);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

export default routes;
