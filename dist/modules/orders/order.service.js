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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersServices = void 0;
const order_model_1 = require("./order.model");
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.create(order);
    return result;
});
const getOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    return result;
});
const getOrderByEmailFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find({ email: email });
    return result;
});
exports.OrdersServices = {
    createOrder,
    getOrderByEmailFromDB,
    getOrdersFromDB
};
