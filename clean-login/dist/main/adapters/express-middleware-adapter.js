"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptMiddleware = void 0;
const http_helper_1 = require("@/presentation/helpers/http-helper");
const adaptMiddleware = (middleware) => {
    return async (req, res, next) => {
        var _a;
        const request = Object.assign({ accessToken: (_a = req.headers) === null || _a === void 0 ? void 0 : _a['x-access-token'] }, (req.headers || {}));
        const httpResponse = await middleware.handle(request);
        if (httpResponse.statusCode === http_helper_1.HttpStatusCode.ok) {
            Object.assign(req, httpResponse.body);
            next();
        }
        else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message,
            });
        }
    };
};
exports.adaptMiddleware = adaptMiddleware;
//# sourceMappingURL=express-middleware-adapter.js.map