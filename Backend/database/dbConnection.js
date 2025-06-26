import mongoose from "mongoose"


    export const dbConnection = () => {
        mongoose.connect(process.env.MONGO_URL,{
            dbName: "batu_e_commerce_project"
        }).then(()=>{
            console.log("Conncetion to database")
        }).catch((err)=>{
            console.log(`some error occured while connecting to database: ${err}`)
        })

    }