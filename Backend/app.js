import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbConnection } from './database/dbConnection.js';
import { config } from 'dotenv';
import userRouter from './Router/userRouter.js';
import productRouter from './Router/productRouter.js'
import messageRouter from './Router/messageRouter.js'
import cartRouter from './Router/cartRouter.js'
import path from 'path';
import { fileURLToPath } from 'url';
import orderRouter from './Router/orderRouter.js'
import os from 'os';

const app = express();
config({path:"./config/config.env"});

//cors 
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type','Authorization','X-Requested-With','Accept']
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());
// format ayarlama extended iç içe tanımlama için isim.isim.isim // form-data
app.use(express.urlencoded({extended:true}));
// resim eklemek
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: os.tmpdir(),
        createParentPath: true
    })
);

dbConnection();

app.use("/api/v1/user" ,userRouter);
app.use("/api/v1/product" ,productRouter);
app.use("/api/v1/message", messageRouter)
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/order", orderRouter)



export default app;