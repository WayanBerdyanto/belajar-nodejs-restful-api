import express from "express";
import userController from "../controller/user-controller.js";
import contactController from "../controller/contact-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.get('/api/users/current', userController.getUser);
userRouter.patch('/api/users/current', userController.updateUser);
userRouter.delete('/api/users/logout', userController.logoutuser);


// Contact API
userRouter.post('/api/contacts', contactController.createContact);
userRouter.get('/api/contacts/:contactId', contactController.getContact);
userRouter.put('/api/contacts/:contactId', contactController.updateContact);
userRouter.delete('/api/contacts/:contactId', contactController.removeContact);

export {
    userRouter
}