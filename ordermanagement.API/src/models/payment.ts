// src/models/Payment.ts
import mongoose, { Document, Schema } from 'mongoose';

// Interface for Payment
interface IPayment extends Document {
  PaymentID: string;       // Primary Key for Payment
  OrderID: string;         // Foreign Key, links to Order
  PaymentDate: Date;       // Date of the payment
  PaymentMethod: string;   // Method of payment (e.g., GCash, Credit Card, etc.)
  PaymentAmount: number;   // Amount paid
}

// Schema for Payment
const PaymentSchema = new Schema<IPayment>(
  {
    PaymentID: { type: String, required: true, unique: true },
    OrderID: { type: String, required: true },
    PaymentDate: { type: Date, required: true },
    PaymentMethod: { type: String, required: true },
    PaymentAmount: { type: Number, required: true, min: 0 },
  },
  { timestamps: false } // No automatic timestamps since they are not in the attributes
);

// Model for Payment
export const Payment = mongoose.model<IPayment>(
  'Payment',
  PaymentSchema
);
