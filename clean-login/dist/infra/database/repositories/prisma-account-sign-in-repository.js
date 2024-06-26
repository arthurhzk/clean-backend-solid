"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAccountSignInRepository = void 0;
const database_1 = __importDefault(require("@/infra/database"));
class PrismaAccountSignInRepository {
    async findByEmail(email) {
        return database_1.default.user.findUnique({
            where: {
                email,
            },
        });
    }
}
exports.PrismaAccountSignInRepository = PrismaAccountSignInRepository;
//# sourceMappingURL=prisma-account-sign-in-repository.js.map