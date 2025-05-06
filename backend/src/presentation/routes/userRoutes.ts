import { Router } from 'express';
import { userController } from '../controllers/userController';

const routerUser = Router();

routerUser.get('/employees', userController.findAllEmployees);
routerUser.get('/clients', userController.findAllClients);
routerUser.get('/', userController.findUsersByFilter);
routerUser.post('/employee', userController.createEmployee);
routerUser.post('/client', userController.createClient);
routerUser.put('/:id', userController.updateUser);
routerUser.delete('/:id', userController.deleteUser);

export default routerUser;
