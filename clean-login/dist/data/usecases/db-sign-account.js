"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSignAccount = void 0;
class DbSignAccount {
    constructor(signAccountRepository) {
        this.signAccountRepository = signAccountRepository;
    }
    findByEmail(email) {
        return this.signAccountRepository.findByEmail(email);
    }
    findById(id) {
        return this.signAccountRepository.findById(id);
    }
}
exports.DbSignAccount = DbSignAccount;
//# sourceMappingURL=db-sign-account.js.map