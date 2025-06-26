import express from 'express'
import { addNewAdmin, adminlogout, allAdmin, allUser, login, userLogout, userRegister } from '../controller/userController.js';
import { isAdminAuthenticated, isUserAuthenticated } from '../middlewares/Auth.js';

const router = express.Router();

router.post("/register",userRegister);
router.post("/login",login)
router.post("/logout",isUserAuthenticated,userLogout)
router.post("/addnewadmin",isAdminAuthenticated,addNewAdmin)
router.post("/adminlogout",isAdminAuthenticated,adminlogout)
router.get("/getUser",isAdminAuthenticated,allUser)
router.get("/getAdmin",isAdminAuthenticated,allAdmin)

export default router;