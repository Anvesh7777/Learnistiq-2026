import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload";
import cors from "cors";

import courseRoute from "./routes/course.route.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import paymentRoute from "./routes/payment.route.js";
import lectureRoute from "./routes/lecture.route.js";
import progressRoute from "./routes/progress.route.js";
import cookieParser from "cookie-parser";
import analyticsRoute from "./routes/analytics.route.js";
import certificateRoute from "./routes/certificate.route.js";

const app = express();
dotenv.config();

  
app.use(express.json()); //data ko parse krna json s
app.use(cookieParser());

app.use(express.urlencoded({extended:true})); //data ko parse krna urlencoded s

//file upload 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
})
);

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT" , "DELETE"],
    allowedHeaders: ["Content-Type","Authorization"],
})
);

const port = process.env.PORT || 3000;
const DB_URI=process.env.MONGO_URI;

try{
   await mongoose.connect(DB_URI);
   console.log("Connected to MongoDB");
}catch(error){
    console.log(error);
}

//defining routes
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/lecture", lectureRoute);
app.use(
  "/api/v1/progress",
  progressRoute
);
app.use(
  "/api/v1/analytics",
  analyticsRoute
);
app.use(
  "/api/v1/certificate",
  certificateRoute
);

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret
});  

app.listen(port, () => {
    console.log(`server running on port ${port}`);    
});



