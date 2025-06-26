import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from '../middlewares/errorMiddleware.js'
import {User} from '../models/userSchema.js'
import { generateToken } from "../utils/jwt.js";

    export const userRegister = catchAsyncError(async(req,res,next)=>{
        const {firstName,lastName,email,phone,password,role,gender,dob} = req.body;

        if(
            !firstName ||
            !lastName || 
            !email ||
            !phone ||
            !password ||
            !role ||
            !gender ||
            !dob
        ) {
            return next(new ErrorHandler("Please Fill Full Form",400))
        }
        
        let user = await User.findOne({email});
        if(user) {
            return next(new ErrorHandler("User Already Register!",400))
        }

        user = await User.create({
            firstName,lastName,email,phone,password,role,gender,dob
        });
        generateToken(user,"User Registered!",200,res);
    });

    export const login = catchAsyncError(async(req,res,next)=>{
        const {email,password} = req.body;

        if(
            !email ||
            !password 
        ){  
            return next(new ErrorHandler("Please Provide all details!",400))
        }

        const user = await User.findOne({email}).select("+password");
        
        if(!user) {
            return next(new ErrorHandler("Invalid Password Or Email!",400))
        }

        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch){
            return next(new ErrorHandler("Incalide Password Or Email!",400))
        }
        generateToken(user,"User Logged Successfully!",200,res)
    }) 

        export const userLogout = catchAsyncError(async(req,res)=>{
            res.status(200).cookie("UserToken","",{
                httpOnly:true,
                expires: new Date(Date.now()),
            })
            .json({
                success:true,
                message:"User Logout Out Successfully!"
            })
        })

        export const getUserDetails = catchAsyncError(async(req,res)=>{
            const user = req.body;
            res.status(200).json({
                success:true,
                user
            })
        })
 
        export const addNewAdmin = catchAsyncError(async(req,res,next)=>{
            const {firstName,lastName,email,phone,gender,password,dob,} = req.body;
            if(
                !firstName ||
                !lastName ||
                !email ||
                !phone ||
                !dob ||
                !gender ||
                !password 
            ){  
                return next(new ErrorHandler("Please Fill Full Form",400));
            }
            const isRegistered = await User.findOne({email});
            if(isRegistered){
                return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`,400))
            }
            const admin = await User.create({
                firstName,
                lastName,
                email,
                phone,
                gender,
                dob,
                password,
                role:"Admin"
            })
            res.status(200).json({
                success:true,
                message:"New Admin Register!",
                admin
            })
        })

        export const adminlogout = catchAsyncError(async(req,res)=>{
            res.status(200).cookie("AdminToken","",{
                httpOnly:true,
                expires: new Date(Date.now())
            })
            .json({
                success:true,
                message:"Admin Logout Out Successfully!"
            })
        })

        export const allUser = catchAsyncError(async(req,res)=>{
            const getuser = await User.find({role:"User"})
            res.status(200).json({
                success:true,
                getuser,
            })
        })

        export const allAdmin = catchAsyncError(async(req,res)=>{
            const getAdmin = await User.find({role:"Admin"})
            res.status(200).json({
                success:true,
                getAdmin,
            })
        })

    