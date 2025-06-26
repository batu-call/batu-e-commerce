import {catchAsyncError} from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'
import { Product } from '../models/productSchema.js';
import cloudinary from 'cloudinary'
    

        export const newProduct= catchAsyncError(async(req,res,next)=>{
        const {product_name,description,price,category,subCategory} = req.body;
        if(
            !product_name ||
            !description ||
            !price ||
            !category ||
            !subCategory 
        ){
            return next(new ErrorHandler("Please Fill Full Form!"));
        }
        if (isNaN(price)) {
            return next(new ErrorHandler("Price must be a number!", 400));
        }
        if(!req.files || Object.keys(req.files).length === 0){
            return next(new ErrorHandler("Product Avatar Required!",400))
        }
        const {images} = req.files;
        const allowedFormats = ["image/png","image/jpeg","image/webp"]
        
        if(!allowedFormats.includes(images.mimetype)){
            return next(new ErrorHandler("File Format Not Supported",400))
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(images.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(new ErrorHandler("Image Upload Failed!", 500));
        }

        const product = await Product.create({
            product_name,
            description,
            price,
            category,
            subCategory,
            images:{
                public_id:cloudinaryResponse.public_id,
                url:cloudinaryResponse.secure_url,
            }
        })
        res.status(200).json({
            success:true,
            message:"New Product Registered!",
            product
        })
    })

        export const getAllProduct = catchAsyncError(async(req,res,next)=>{
            const product = await Product.find();
            res.status(200).json({
                success:true,
                product,
            })
        })

        export const deleteProduct = catchAsyncError(async(req,res,next)=>{
            const {productId} = req.params;

            const product = await Product.findById(productId);

            if(!product){
               return next(new ErrorHandler("Product Not Found!",404))
            }

            await Product.findByIdAndDelete(productId);

            res.status(200).json({
                success:true,
                message:"Product Deleted Successfully!"
            })
        })

        export const getProductId = catchAsyncError(async(req,res,next)=>{
           
            const product = await Product.findById(req.params.id);

            if(!product){   
                next(new ErrorHandler("Product Not Found!",404))
            }
            res.status(200).json({
                success:true,
                product
            })
        })