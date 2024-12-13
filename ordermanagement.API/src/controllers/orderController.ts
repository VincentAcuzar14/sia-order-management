import { Request, Response } from "express";
import { OrderDetail } from "../models/order";
import { IOrder } from "../interfaces/order";
import mongoose from "mongoose";
import { validateOrderDetail } from "../validations/order";

export class OrderController {
  // Create a new order detail
  // Handles POST requests to create a new order detail in the database
  public async createorder(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming order detail data against schema rules
      const { error, value: payload } = validateOrderDetail(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare order detail data with a new MongoDB ID
      const orderDetailData: IOrder = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new order detail to the database
      const orderDetail = new OrderDetail(orderDetailData);
      const savedOrderDetail = await orderDetail.save();

      // Return the newly created order detail with 201 Created status
      res.status(201).json(savedOrderDetail);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all order details
  // Handles GET requests to retrieve all order details from the database
  public async getAllOrderDetails(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all order details from the database
      const orderDetails: IOrder[] = await OrderDetail.find();
      res.json(orderDetails);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get order detail by ID
  // Handles GET requests to retrieve a specific order detail by its ID
  public async getOrderDetailById(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find order detail by ID
      const orderDetail: IOrder | null = await OrderDetail.findById(req.params.id);

      // Return 404 if order detail doesn't exist
      if (!orderDetail) {
        res.status(404).json({ message: "Order detail not found" });
        return;
      }

      // Return the found order detail
      res.json(orderDetail);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update order detail
  // Handles PUT/PATCH requests to update an existing order detail
  public async updateOrderDetail(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated order detail data
      const { error, value: payload } = validateOrderDetail(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Update the order detail and get the updated document
      const updatedOrderDetail: IOrder | null = await OrderDetail.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true } // This option returns the modified document rather than the original
      );

      // Return 404 if order detail doesn't exist
      if (!updatedOrderDetail) {
        res.status(404).json({ message: "Order detail not found" });
        return;
      }

      // Return the updated order detail
      res.json(updatedOrderDetail);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete order detail
  // Handles DELETE requests to remove an order detail from the database
  public async deleteOrderDetail(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the order detail in one operation
      const deletedOrderDetail: IOrder | null = await OrderDetail.findByIdAndDelete(req.params.id);

      // Return 404 if order detail doesn't exist
      if (!deletedOrderDetail) {
        res.status(404).json({ message: "Order detail not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Order detail deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
