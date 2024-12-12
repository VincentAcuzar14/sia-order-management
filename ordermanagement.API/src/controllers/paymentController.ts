import { Request, Response } from "express";
import { Payment } from "../models/payment";
import { IPayment } from "../interfaces/paymentInterface";
import mongoose from "mongoose";
import { validatePayment } from "../validations/paymentValidation";

export class PaymentController {
  // Create a new payment
  // Handles POST requests to create a new payment in the database
  public async createPayment(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming payment data against schema rules
      const { error, value: payload } = validatePayment(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare payment data with a new MongoDB ID
      const paymentData: IPayment = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new payment to the database
      const payment = new Payment(paymentData);
      const savedPayment = await payment.save();

      // Return the newly created payment with 201 Created status
      res.status(201).json(savedPayment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all payments
  // Handles GET requests to retrieve all payments from the database
  public async getAllPayments(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all payments from the database
      const payments: IPayment[] = await Payment.find();
      res.json(payments);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get payment by ID
  // Handles GET requests to retrieve a specific payment by its ID
  public async getPaymentById(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find payment by ID
      const payment: IPayment | null = await Payment.findById(req.params.id);

      // Return 404 if payment doesn't exist
      if (!payment) {
        res.status(404).json({ message: "Payment not found" });
        return;
      }

      // Return the found payment
      res.json(payment);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update payment
  // Handles PUT/PATCH requests to update an existing payment
  public async updatePayment(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated payment data
      const { error, value: payload } = validatePayment(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Update the payment and get the updated document
      const updatedPayment: IPayment | null = await Payment.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true } // This option returns the modified document rather than the original
      );

      // Return 404 if payment doesn't exist
      if (!updatedPayment) {
        res.status(404).json({ message: "Payment not found" });
        return;
      }

      // Return the updated payment
      res.json(updatedPayment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete payment
  // Handles DELETE requests to remove a payment from the database
  public async deletePayment(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the payment in one operation
      const deletedPayment: IPayment | null = await Payment.findByIdAndDelete(req.params.id);

      // Return 404 if payment doesn't exist
      if (!deletedPayment) {
        res.status(404).json({ message: "Payment not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Payment deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
