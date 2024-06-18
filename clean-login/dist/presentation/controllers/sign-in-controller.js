"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignInController = void 0;
const bcrypt_adapter_1 = require("@/infra/cryptography/bcrypt-adapter");
const not_found_error_1 = require("@/presentation/errors/not-found-error");
const http_helper_1 = require("@/presentation/helpers/http-helper");
const prisma_account_sign_in_repository_1 = require("@/infra/database/repositories/prisma-account-sign-in-repository");
const schemas_1 = require("@/main/schemas");
const jwt_adapter_1 = require("@/infra/cryptography/jwt-adapter");
const incorrect_password_error_1 = require("@/presentation/errors/incorrect-password-error");
const env_1 = require("@/main/env");
class SignInController {
    constructor(signInRepository) {
        this.signInRepository = signInRepository;
    }
    async handle(httpRequest) {
        const validatedBody = schemas_1.SignInSchema.parse(httpRequest.body);
        const { email, password } = validatedBody;
        const user = await this.signInRepository.findByEmail(email);
        if (!user) {
            return (0, http_helper_1.notFound)(new not_found_error_1.NotFoundError());
        }
        const salt = 12;
        const doesPasswordMatch = await new bcrypt_adapter_1.BcryptAdapter(salt).compare(password, user.password);
        const token = await new jwt_adapter_1.JwtAdapter(env_1.env.JWT_SECRET).encrypt(user.id);
        if (!doesPasswordMatch) {
            return (0, http_helper_1.unauthorized)(new incorrect_password_error_1.IncorrectPasswordError());
        }
        return (0, http_helper_1.ok)({ user, token });
    }
}
const makeSignInController = () => {
    const prismaAccountSignInRepository = new prisma_account_sign_in_repository_1.PrismaAccountSignInRepository();
    return new SignInController(prismaAccountSignInRepository);
};
exports.makeSignInController = makeSignInController;
//# sourceMappingURL=sign-in-controller.js.map