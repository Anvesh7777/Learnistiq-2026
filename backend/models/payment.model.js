import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({

    razorpay_order_id:{
        type:String,
        required:true,
    },
    razorpay_payment_id:{
        type:String,
        required:true,
    },
    razorpay_signature:{
        type:String,
        required:true,
    },
    userId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
          required: true,
    },
    courseId: {
          type: mongoose.Types.ObjectId,
          ref: "Course",
          required: true,
    },

});

export const Payment = mongoose.model("Payment", paymentSchema);

