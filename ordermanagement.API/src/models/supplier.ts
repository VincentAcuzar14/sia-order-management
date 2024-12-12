// src/models/Supplier.ts
import mongoose, { Document, Schema } from 'mongoose';

// Interface for Supplier
interface ISupplier extends Document {
  SupplierID: string;       // Primary Key for Supplier
  SupplierName: string;     // Name of the supplier
  ContactInfo: string;      // Contact information (e.g., phone or email)
  Address: string;          // Address of the supplier
}

// Schema for Supplier
const SupplierSchema = new Schema<ISupplier>(
  {
    SupplierID: { type: String, required: true, unique: true },
    SupplierName: { type: String, required: true },
    ContactInfo: { type: String, required: true },
    Address: { type: String, required: true },
  },
  { timestamps: false } // No automatic timestamps since they are not in the attributes
);

// Model for Supplier
export const Supplier = mongoose.model<ISupplier>(
  'Supplier',
  SupplierSchema
);
