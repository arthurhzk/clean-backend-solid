"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusCode = exports.forbidden = exports.noContent = exports.unauthorized = exports.notFound = exports.conflict = exports.created = exports.ok = exports.serverError = exports.badRequest = void 0;
const server_error_1 = require("@/presentation/errors/server-error");
const badRequest = (error) => ({
    statusCode: HttpStatusCode.badRequest,
    body: error,
});
exports.badRequest = badRequest;
const serverError = () => ({
    statusCode: HttpStatusCode.serverError,
    body: new server_error_1.ServerError(),
});
exports.serverError = serverError;
const ok = (data) => ({
    statusCode: HttpStatusCode.ok,
    body: data,
});
exports.ok = ok;
const created = (data) => ({
    statusCode: HttpStatusCode.created,
    body: data,
});
exports.created = created;
const conflict = (error) => ({
    statusCode: HttpStatusCode.conflict,
    body: error,
});
exports.conflict = conflict;
const notFound = (error) => ({
    statusCode: HttpStatusCode.notFound,
    body: error,
});
exports.notFound = notFound;
const unauthorized = (error) => ({
    statusCode: HttpStatusCode.unauthorized,
    body: error,
});
exports.unauthorized = unauthorized;
const noContent = () => ({
    statusCode: HttpStatusCode.noContent,
    body: null,
});
exports.noContent = noContent;
const forbidden = (error) => ({
    statusCode: HttpStatusCode.forbidden,
    body: error,
});
exports.forbidden = forbidden;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["ok"] = 200] = "ok";
    HttpStatusCode[HttpStatusCode["noContent"] = 204] = "noContent";
    HttpStatusCode[HttpStatusCode["badRequest"] = 400] = "badRequest";
    HttpStatusCode[HttpStatusCode["unauthorized"] = 401] = "unauthorized";
    HttpStatusCode[HttpStatusCode["forbidden"] = 403] = "forbidden";
    HttpStatusCode[HttpStatusCode["notFound"] = 404] = "notFound";
    HttpStatusCode[HttpStatusCode["serverError"] = 500] = "serverError";
    HttpStatusCode[HttpStatusCode["created"] = 201] = "created";
    HttpStatusCode[HttpStatusCode["conflict"] = 409] = "conflict";
})(HttpStatusCode || (exports.HttpStatusCode = HttpStatusCode = {}));
//# sourceMappingURL=http-helper.js.map