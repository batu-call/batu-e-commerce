import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
   

export const userSchema  = mongoose.Schema({
        
        firstName:{
            type:String,
            required:true,
            minLength:[
                3,"First Name Must Contain At Least 3 Characters!"
            ]
        },
        lastName:{
            type:String,
            required:true,
            minLength:[
                3,"Last Name Must Contain At Least 3 Characters!"
            ]
        },
        email:{
            type:String,
            required:true,
            validate:[
                validator.isEmail, "Please Provide A Valid Emial"
            ]
        },
        phone:{
            type:String,
            required:true,
            minLenth:[
                11, "Phone Number Must Contain Exact 11 Digits!"
            ],
            maxLength:[
                11, "Phone Number Must Contain Exact 11 Digits!"
            ]
        },
        password:{
            type:String,
            required:true,
            minLength:[
                8,"Password Must Contain At Least 8 Characters!"
            ],
            select:false,
        },
        role:{
            type:String,
            enum:["Admin","User"],
            default:"User",
        },
        gender:{
            type:String,
            required:true,
            enum:["Male","Female","Other"]
        },
        dob:{
            type:Date,
            required:[true,"DOB is required!"],
        },
   })

   userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    });

    userSchema.methods.comparePassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword,this.password)
    };

    // jwt oluşturma expiresIn süresinin dolması
    userSchema.methods.generateJsonWebToken = function (){
        return jwt.sign({id: this.id}, process.env.JWT_SECRET_KEY,{
            expiresIn: process.env.JWT_EXPIRES,
        });
    }

export const User = mongoose.model("User", userSchema);