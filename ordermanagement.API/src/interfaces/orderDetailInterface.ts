import { Document } from "mongoose";

export interface IOrderDetail extends Document {
  orderDetailId: number; // Unique identifier for the order detail
  orderId: number;       // ID linking the detail to an order
  productId: number;     // ID of the product in the order
  quantity: number;      // Quantity of the product in the order
  price: number;         // Price of the product
}
