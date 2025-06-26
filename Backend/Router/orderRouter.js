import express from 'express'
import { createOrder } from '../controller/orderController.js';
import { isUserAuthenticated } from '../middlewares/Auth.js';

    
const router = express.Router()

    router.post("/add",isUserAuthenticated,createOrder);

    export default router;