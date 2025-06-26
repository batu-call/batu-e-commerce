import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import Order from '../models/orderSchema.js'


    export const createOrder = catchAsyncError(async(req,res,next)=>{
        const {items,address,city,country,postalCode} = req.body
        const userId = req.user._id;

        if(!address ||
           !city ||
           !country ||
           !postalCode
        ){
           return next(new ErrorHandler("Please Fill Full Form!"));
        }
        if(!items && items.length   === 0){
            return next(new ErrorHandler("Order items cannot be empty"))
        }
        const order = await Order.create({
            user:userId,
            items,
            address,
            city,
            postalCode,
            country,
        })

        res.status(200).json({
            success:true,
            message:"Order placed successfully",
            order
        })
    }); 
    