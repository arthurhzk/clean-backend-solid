"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignUpController = void 0;
const http_helper_1 = require("@/presentation/helpers/http-helper");
const invalid_param_error_1 = require("@/presentation/errors/invalid-param-error");
const schemas_1 = require("@/main/schemas");
const prisma_account_add_repository_1 = require("@/infra/database/repositories/prisma-account-add-repository");
const email_already_exists_1 = require("@/presentation/errors/email-already-exists");
class SignUpController {
    constructor(addAccount, accountRepository) {
        this.addAccount = addAccount;
        this.accountRepository = accountRepository;
    }
    async handle(httpRequest) {
        const validatedBody = schemas_1.SignUpSchema.parse(httpRequest.body);
        const { name, email, password, confirmPassword } = validatedBody;
        if (password !== confirmPassword) {
            return (0, http_helper_1.badRequest)(new invalid_param_error_1.InvalidParamError('passwordConfirmation'));
        }
        if (await this.accountRepository.verifyEmail(email)) {
            return (0, http_helper_1.conflict)(new email_already_exists_1.EmailAlreadyExists());
        }
        return (0, http_helper_1.created)(await this.addAccount.add({ name, email, password }));
    }
}
const makeSignUpController = () => {
    const prismaAccountAddRepository = new prisma_account_add_repository_1.PrismaAccountAddRepository();
    const prismaVerifyEmailRepository = new prisma_account_add_repository_1.PrismaAccountAddRepository();
    return new SignUpController(prismaAccountAddRepository, prismaVerifyEmailRepository);
};
exports.makeSignUpController = makeSignUpController;
//# sourceMappingURL=sign-up-controller.js.map