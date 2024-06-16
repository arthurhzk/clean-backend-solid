"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncorrectPasswordError = void 0;
class IncorrectPasswordError extends Error {
    constructor() {
        super('Incorrect password');
        this.name = 'IncorrectPasswordError';
    }
}
exports.IncorrectPasswordError = IncorrectPasswordError;
//# sourceMappingURL=incorrect-password-error.js.map