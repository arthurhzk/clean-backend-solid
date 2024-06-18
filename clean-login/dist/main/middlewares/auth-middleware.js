"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const access_denied_error_1 = require("@/presentation/errors/access-denied-error");
const http_helper_1 = require("@/presentation/helpers/http-helper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../env");
class AuthMiddleware {
    async handle(request) {
        var _a;
        try {
            const token = (_a = request.headers) === null || _a === void 0 ? void 0 : _a['x-access-token'];
            if (!token) {
                return (0, http_helper_1.forbidden)(new access_denied_error_1.AccessDeniedError());
            }
            const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
            if (!decoded) {
                return (0, http_helper_1.forbidden)(new access_denied_error_1.AccessDeniedError());
            }
            return (0, http_helper_1.ok)({ userId: decoded });
        }
        catch (error) {
            return (0, http_helper_1.serverError)();
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth-middleware.js.map