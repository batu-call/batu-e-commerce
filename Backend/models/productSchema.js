import mongoose from "mongoose";



    export const productSchema = mongoose.Schema({
        product_name:{
            type:String,
            required:true,
            trim:true,
        },
        description:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
            maxLength:[8,"Price Cannot Exceed 8 Characters!"]
        },
        category:{
            type:String,
            required:true,
            enum:["Men","Women","Children","Shoes","Electronic","Home Appliances"],
        },
        subCategory:{
            type:String,
            required:true,
            enum: ["T-shirt", "Pants", "Dress", "Jacket", "Skirt", "Sweatshirt", "Shirt", "Pajamas","Sneakers","Boots","Sandals","Loafers","Heels","Flats","Mobile Phones","Laptops & Tablets","Televisions","Headphones & Earbuds","Cameras & Photography","Refrigerators","Washing Machines","Microwave Ovens","Dishwashers","Vacuum Cleaners","Heaters","Coffee Makers"]
        },
        images:[
            {
                public_id: {type:String,required:true},
                url: {type:String,required:true},
            },
        ],
        isNewArrivals:Boolean,
        CreateAt:{
            type:Date,
            default:Date.now
        },
    })


    export const Product = mongoose.model("Product",productSchema);


