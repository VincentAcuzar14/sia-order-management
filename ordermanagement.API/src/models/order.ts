// src/models/OrderDetail.ts
import mongoose, { Document, Schema } from 'mongoose';

// Interface for Order_Detail
interface IOrder extends Document {
  OrderID: string;        // Foreign Key, links to Order
  ProductID: string;      // Foreign Key, links to Product
  Quantity: number;       // Quantity of the product in the order
  Price: number;          // Price per unit of the product
}

// Schema for Order_Detail
const OrderSchema = new Schema<IOrder>(
  {
    OrderID: { type: String, required: true },
    ProductID: { type: String, required: true },
    Quantity: { type: Number, required: true, min: 0 },
    Price: { type: Number, required: true, min: 0 },
  },
  { timestamps: false } // No automatic timestamps since they are not in the attributes
);

// Model for Order_Detail
export const OrderDetail = mongoose.model<IOrder>(
  'Orderl',
  OrderSchema
);
