import express from 'express'
import { addToCart, getCart, removeCart } from '../controller/cartController.js';
import { isUserAuthenticated } from '../middlewares/Auth.js';

    const router = express.Router();


router.get("/getCart",isUserAuthenticated,getCart);
router.post("/addCart",isUserAuthenticated,addToCart);
router.delete("/:productId",isUserAuthenticated,removeCart);


export default router;