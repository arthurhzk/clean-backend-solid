import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import {
  badRequest,
  conflict,
  created,
} from '@/presentation/helpers/http-helper'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { SignUpSchema } from '@/main/schemas'
import { PrismaAccountAddRepository } from '@/infra/database/repositories/prisma-account-add-repository'
import { EmailAlreadyExists } from '@/presentation/errors/email-already-exists'

class SignUpController implements Controller {
  constructor(private readonly accountRepository: PrismaAccountAddRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const validatedBody = SignUpSchema.parse(httpRequest.body)
    const { name, email, password, confirmPassword } = validatedBody

    if (password !== confirmPassword) {
      return badRequest(new InvalidParamError('passwordConfirmation'))
    }

    const verifyEmail = await this.accountRepository.verifyEmail(email)
    if (verifyEmail) {
      return conflict(new EmailAlreadyExists())
    }

    return created(await this.accountRepository.add({ name, email, password }))
  }
}

export const makeSignUpController = (): SignUpController => {
  const prismaAccountAddRepository = new PrismaAccountAddRepository()
  return new SignUpController(prismaAccountAddRepository)
}
