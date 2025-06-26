import mongoose from 'mongoose'

  export const cartItemSchema = new mongoose.Schema({    
        productId:{
                type: mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'Product'
            },
            quantity:{
                type:Number,
                default:1
            }
    });


    export const cartSchema = new mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },
        items:[cartItemSchema]
    });


    export const Cart = mongoose.model('Cart',cartSchema);