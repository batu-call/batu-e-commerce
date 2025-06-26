import mongoose from "mongoose"
import validator from 'validator';

    const messageSchema = mongoose.Schema({
        first_name : {
            type:String,
            required:true,
            minLength:[
                3, "The name cannot be less than 3 characters."
            ]
        },
        last_name:{
            type:String,
            required:true,
        },
        message_email:{
            type:String,
            required:true,
            validate:[
                validator.isEmail,"Please Provide A Valid Emial"
            ]
        },
        message_phone:{
            type:String,
            required:true,
            minLength:[
                11,"Phone must be at least 11 characters"
            ]
        },
        send_message:{
            type:String,
            required:true
        }
    })


    export const Message =  mongoose.model("Message",messageSchema);