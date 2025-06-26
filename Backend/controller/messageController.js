import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Message } from "../models/messageSchema.js";

    export const sendMessage = catchAsyncError(async(req,res,next)=>{
        const {first_name,last_name,message_email,message_phone,send_message} = req.body;

        if(
            !first_name ||
            !last_name ||
            !message_email ||
            !message_phone||
            !send_message
        ){
            next(new ErrorHandler("Please Fill Full Form!",400))
        }

        const message = await Message.create({
            first_name,
            last_name,
            message_email,
            message_phone,
            send_message
        })
        res.status(200).json({
            success:true,
            message:"Message Saved Successfully",
            message
        })
    }) 