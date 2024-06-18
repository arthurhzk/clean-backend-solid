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
const add_task_controller_1 = require("@/presentation/controllers/add-task-controller");
const express_middleware_adapter_1 = require("../adapters/express-middleware-adapter");
const auth_middleware_1 = require("@/main/middlewares/auth-middleware");
exports.default = (app) => {
    const router = (0, express_1.Router)();
    app.use((0, cors_1.default)());
    app.use('/api', router);
    router.post('/signup', (0, express_route_adapter_1.adaptRoute)((0, sign_up_controller_1.makeSignUpController)()));
    router.post('/signin', (0, express_route_adapter_1.adaptRoute)((0, sign_in_controller_1.makeSignInController)()));
    router.post('/add', (0, express_middleware_adapter_1.adaptMiddleware)(new auth_middleware_1.AuthMiddleware()), (0, express_route_adapter_1.adaptRoute)((0, add_task_controller_1.makeAddTaskController)()));
};
//# sourceMappingURL=routes.js.map