"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAccountAddRepository = void 0;
const database_1 = __importDefault(require("@/infra/database"));
const bcrypt_adapter_1 = require("@/infra/cryptography/bcrypt-adapter");
class PrismaAccountAddRepository {
    async verifyEmail(email) {
        return database_1.default.user.findFirst({
            where: {
                email: email,
            },
        });
    }
    async add(accountData) {
        const salt = 12;
        const hashedPassword = await new bcrypt_adapter_1.BcryptAdapter(salt).hash(accountData.password);
        return database_1.default.user.create({
            data: Object.assign(Object.assign({}, accountData), { password: hashedPassword }),
        });
    }
}
exports.PrismaAccountAddRepository = PrismaAccountAddRepository;
//# sourceMappingURL=prisma-account-add-repository.js.map