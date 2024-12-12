import express from "express";
import { OrderDetailController } from "../controllers/orderDetailController";
import { authMiddleware } from "../middleware/authMiddleware";

// Initialize express Router
const router = express.Router();
const orderDetailsController = new OrderDetailController();

/**
 * @swagger
 * tags:
 *   name: OrderDetails
 *   description: Order Details Management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderDetail:
 *       type: object
 *       required:
 *         - OrderDetailID
 *         - OrderID
 *         - ProductID
 *         - Quantity
 *         - Price
 *       properties:
 *         OrderDetailID:
 *           type: string
 *           description: Unique identifier for the order detail
 *         OrderID:
 *           type: string
 *           description: Foreign key linking to the Order
 *         ProductID:
 *           type: string
 *           description: Foreign key linking to the Product
 *         Quantity:
 *           type: integer
 *           description: Quantity of the product in the order
 *         Price:
 *           type: number
 *           description: Price per unit of the product
 *     OrderDetailResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the order detail
 *         OrderID:
 *           type: string
 *           description: Foreign key linking to the Order
 *         ProductID:
 *           type: string
 *           description: Foreign key linking to the Product
 *         Quantity:
 *           type: integer
 *           description: Quantity of the product in the order
 *         Price:
 *           type: number
 *           description: Price per unit of the product
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the order detail was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the order detail was last updated
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 description: The field that caused the validation error
 *               message:
 *                 type: string
 *                 description: Details about the validation error
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/order-details:
 *   post:
 *     summary: Add a new order detail
 *     tags: [OrderDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderDetail'
 *     responses:
 *       201:
 *         description: Order detail created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetailResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 *   get:
 *     summary: Get all order details
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of order details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderDetailResponse'
 *
 * /api/order-details/{id}:
 *   get:
 *     summary: Get order detail by ID
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order detail ID
 *     responses:
 *       200:
 *         description: Order detail details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetailResponse'
 *       404:
 *         description: Order detail not found
 *
 *   put:
 *     summary: Update order detail
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order detail ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderDetail'
 *     responses:
 *       200:
 *         description: Order detail updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetailResponse'
 *       404:
 *         description: Order detail not found
 *
 *   delete:
 *     summary: Delete order detail
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order detail ID
 *     responses:
 *       204:
 *         description: Order detail deleted successfully
 *       404:
 *         description: Order detail not found
 */

// Define Routes
router.post("/api/order-details", authMiddleware, orderDetailsController.createOrderDetail);
router.get("/api/order-details", authMiddleware, orderDetailsController.getAllOrderDetails);
router.get("/api/order-details/:id", authMiddleware, orderDetailsController.getOrderDetailById);
router.put("/api/order-details/:id", authMiddleware, orderDetailsController.updateOrderDetail);
router.delete("/api/order-details/:id", authMiddleware, orderDetailsController.deleteOrderDetail);

export default router;
