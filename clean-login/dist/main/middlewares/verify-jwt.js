"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_helper_1 = require("@/presentation/helpers/http-helper");
const access_denied_error_1 = require("@/presentation/errors/access-denied-error");
const env_1 = require("@/main/env");
class VerifyJwt {
    async handle(httpRequest) {
        const token = httpRequest.headers['x-access-token'];
        if (!token) {
            (0, http_helper_1.unauthorized)(new access_denied_error_1.AccessDeniedError());
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        if (!decoded.id) {
            throw new access_denied_error_1.AccessDeniedError();
        }
        return (0, http_helper_1.ok)({ id: decoded.id });
    }
}
exports.VerifyJwt = VerifyJwt;
//# sourceMappingURL=verify-jwt.js.map