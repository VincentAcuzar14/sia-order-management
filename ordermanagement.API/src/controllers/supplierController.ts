import { Request, Response } from "express";
import { Supplier } from "../models/supplier";
import { ISupplier } from "../interfaces/supplierInterface";
import mongoose from "mongoose";
import { validateSupplier } from "../validations/supplierValidation";

export class SupplierController {
  // Create a new supplier
  // Handles POST requests to create a new supplier in the database
  public async createSupplier(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming supplier data against schema rules
      const { error, value: payload } = validateSupplier(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare supplier data with a new MongoDB ID
      const supplierData: ISupplier = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new supplier to the database
      const supplier = new Supplier(supplierData);
      const savedSupplier = await supplier.save();

      // Return the newly created supplier with 201 Created status
      res.status(201).json(savedSupplier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all suppliers
  // Handles GET requests to retrieve all suppliers from the database
  public async getAllSuppliers(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all suppliers from the database
      const suppliers: ISupplier[] = await Supplier.find();
      res.json(suppliers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get supplier by ID
  // Handles GET requests to retrieve a specific supplier by their ID
  public async getSupplierById(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find supplier by ID
      const supplier: ISupplier | null = await Supplier.findById(req.params.id);

      // Return 404 if supplier doesn't exist
      if (!supplier) {
        res.status(404).json({ message: "Supplier not found" });
        return;
      }

      // Return the found supplier
      res.json(supplier);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update supplier
  // Handles PUT/PATCH requests to update an existing supplier
  public async updateSupplier(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated supplier data
      const { error, value: payload } = validateSupplier(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Update the supplier and get the updated document
      const updatedSupplier: ISupplier | null = await Supplier.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true } // This option returns the modified document rather than the original
      );

      // Return 404 if supplier doesn't exist
      if (!updatedSupplier) {
        res.status(404).json({ message: "Supplier not found" });
        return;
      }

      // Return the updated supplier
      res.json(updatedSupplier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete supplier
  // Handles DELETE requests to remove a supplier from the database
  public async deleteSupplier(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the supplier in one operation
      const deletedSupplier: ISupplier | null = await Supplier.findByIdAndDelete(req.params.id);

      // Return 404 if supplier doesn't exist
      if (!deletedSupplier) {
        res.status(404).json({ message: "Supplier not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Supplier deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
