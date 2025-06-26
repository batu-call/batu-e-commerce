import express from 'express'
import { deleteProduct, getAllProduct, getProductId, newProduct } from '../controller/productController.js';
import { isAdminAuthenticated } from '../middlewares/Auth.js';

const router = express.Router();

router.post("/addProduct",isAdminAuthenticated,newProduct)
router.get("/getProduct",getAllProduct)
router.delete("/delete/:productId",isAdminAuthenticated,deleteProduct)
router.get("/:id",getProductId)



export default router;