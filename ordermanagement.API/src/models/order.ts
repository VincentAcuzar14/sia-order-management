// src/models/OrderDetail.ts
import mongoose, { Document, Schema } from 'mongoose';

// Interface for Order_Detail
interface IOrderDetail extends Document {
  OrderDetailID: string;  // Primary Key for Order_Detail
  OrderID: string;        // Foreign Key, links to Order
  ProductID: string;      // Foreign Key, links to Product
  Quantity: number;       // Quantity of the product in the order
  Price: number;          // Price per unit of the product
}

// Schema for Order_Detail
const OrderDetailSchema = new Schema<IOrderDetail>(
  {
    OrderDetailID: { type: String, required: true, unique: true },
    OrderID: { type: String, required: true },
    ProductID: { type: String, required: true },
    Quantity: { type: Number, required: true, min: 0 },
    Price: { type: Number, required: true, min: 0 },
  },
  { timestamps: false } // No automatic timestamps since they are not in the attributes
);

// Model for Order_Detail
export const OrderDetail = mongoose.model<IOrderDetail>(
  'OrderDetail',
  OrderDetailSchema
);
