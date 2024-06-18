import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { NotFoundError } from '@/presentation/errors/not-found-error'
import { notFound, ok, unauthorized } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { PrismaAccountSignInRepository } from '@/infra/database/repositories/prisma-account-sign-in-repository'
import { SignInSchema } from '@/main/schemas'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import { IncorrectPasswordError } from '@/presentation/errors/incorrect-password-error'
import { env } from '@/main/env'
class SignInController implements Controller {
  constructor(
    private readonly signInRepository: PrismaAccountSignInRepository
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const validatedBody = SignInSchema.parse(httpRequest.body)
    const { email, password } = validatedBody
    const user = await this.signInRepository.findByEmail(email)
    if (!user) {
      return notFound(new NotFoundError())
    }
    const salt = 12
    const doesPasswordMatch = await new BcryptAdapter(salt).compare(
      password,
      user.password
    )
    const token = await new JwtAdapter(env.JWT_SECRET).encrypt(user.id)
    if (!doesPasswordMatch) {
      return unauthorized(new IncorrectPasswordError())
    }
    return ok({ user, token })
  }
}

export const makeSignInController = (): SignInController => {
  const prismaAccountSignInRepository = new PrismaAccountSignInRepository()
  return new SignInController(prismaAccountSignInRepository)
}
