"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const product_model_1 = require("../products/product.model");
const order_validation_1 = __importDefault(require("./order.validation"));
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const productsData = yield product_model_1.Product.findById(orderData.productId);
        if (!productsData) {
            res.status(500).json({
                success: false,
                message: "No Product Found",
            });
            return;
        }
        if (orderData.quantity > productsData.inventory.quantity ||
            !productsData.inventory.inStock) {
            res.status(400).json({
                success: false,
                message: "Insufficient quantity",
            });
            return;
        }
        productsData.inventory.quantity -= orderData.quantity;
        productsData.inventory.inStock = productsData.inventory.quantity > 0;
        yield productsData.save();
        const orderValidationData = yield order_validation_1.default.parse(orderData);
        const result = yield order_service_1.OrdersServices.createOrder(orderValidationData);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        if (email) {
            const result = yield order_service_1.OrdersServices.getOrderByEmailFromDB(email);
            if (!result.length) {
                return res.status(200).json({
                    success: true,
                    message: "No Order Found",
                });
            }
            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully for user email!",
                data: result,
            });
        }
        else {
            const result = yield order_service_1.OrdersServices.getOrdersFromDB();
            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.OrderController = {
    createOrder,
    getOrders
};
