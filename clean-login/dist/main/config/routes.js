"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_route_adapter_1 = require("@/main/adapters/express-route-adapter");
const cors_1 = __importDefault(require("cors"));
const sign_up_controller_1 = require("@/presentation/controllers/sign-up-controller");
const sign_in_controller_1 = require("@/presentation/controllers/sign-in-controller");
const express_middleware_adapter_1 = require("@/main/adapters/express-middleware-adapter");
const verify_jwt_1 = require("@/main/middlewares/verify-jwt");
exports.default = (app) => {
    const adaptedMiddleware = (0, express_middleware_adapter_1.adaptMiddleware)(new verify_jwt_1.VerifyJwt());
    const router = (0, express_1.Router)();
    app.use('/api', router);
    app.use((0, cors_1.default)());
    router.post('/signup', (0, express_route_adapter_1.adaptRoute)((0, sign_up_controller_1.makeSignUpController)()));
    router.post('/signin', (0, express_route_adapter_1.adaptRoute)((0, sign_in_controller_1.makeSignInController)()));
};
//# sourceMappingURL=routes.js.map