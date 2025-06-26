import {catchAsyncError} from '../middlewares/catchAsyncError.js'
import { Cart } from '../models/cartSchema.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'

    export const getCart = catchAsyncError(async(req,res,next)=>{
        const cart = await Cart.findOne({user:req.user.id}).populate('items.productId');

        if(!cart){
            return next(new ErrorHandler("Cart not found",404));
        }
        res.status(200).json({
            success:true,
            cart
        })
    });

    export const addToCart = catchAsyncError(async(req,res,next)=>{
        const {productId,quantity} = req.body;  

        if (!productId || !quantity) {
            return next(new ErrorHandler("Product ID or quantity is missing", 400));
        }
        let cart = await Cart.findOne({user:req.user.id});
        if(!cart){
            cart = new Cart({
                user:req.user.id,
                items:[{productId,quantity}]
            });
        }
        else{
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if(itemIndex > -1){
                cart.items[itemIndex].quantity += quantity;
            }
            else{
                cart.items.push({productId,quantity});
            }
        }
        await cart.save();
        res.status(200).json({
            success:true,
            message:"Cart added successfully"
        });
    })

    export const removeCart = catchAsyncError(async(req,res,next)=>{
        const {productId} = req.params;

        const cart = await Cart.findOne({user:req.user.id});
        if(!cart){
            return next(new ErrorHandler("Cart not found",400));
        }
        const newItems = cart.items.filter(item => item.productId.toString() !== productId);
        if(newItems.length === cart.items.length){
            return next(new ErrorHandler("Product not found in cart",400));
        }
        cart.items = newItems
        await cart.save();
        res.status(200).json({
            success:true,
            cart
        })
    })