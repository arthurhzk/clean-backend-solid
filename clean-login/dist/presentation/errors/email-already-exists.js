"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlreadyExists = void 0;
class EmailAlreadyExists extends Error {
    constructor() {
        super('The received email is already in use');
        this.name = 'EmailAlreadyExists';
    }
}
exports.EmailAlreadyExists = EmailAlreadyExists;
//# sourceMappingURL=email-already-exists.js.map