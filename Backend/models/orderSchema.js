import mongoose from "mongoose";

export const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    enum: ["usa", "germany", "france", "turkey"],
  },
  status: {
    type: String,
    enum: ["Preparing", "Shipped", "Delivered"],
    default: "Preparing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


   export default orderSchema;