"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbAddAccount = void 0;
class DbAddAccount {
    constructor(addAccountRepository) {
        this.addAccountRepository = addAccountRepository;
    }
    add(accountData) {
        return this.addAccountRepository.add(accountData);
    }
    verifyEmail(email) {
        return this.addAccountRepository.verifyEmail(email);
    }
}
exports.DbAddAccount = DbAddAccount;
//# sourceMappingURL=db-add-account.js.map