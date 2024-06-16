import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { AddAccount } from '@/domain/usecases/add-account'
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
  constructor(
    private readonly addAccount: AddAccount,
    private readonly accountRepository: PrismaAccountAddRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const validatedBody = SignUpSchema.parse(httpRequest.body)
    const { name, email, password, confirmPassword } = validatedBody

    if (password !== confirmPassword) {
      return badRequest(new InvalidParamError('passwordConfirmation'))
    }

    if (await this.accountRepository.verifyEmail(email)) {
      return conflict(new EmailAlreadyExists())
    }

    return created(await this.addAccount.add({ name, email, password }))
  }
}

export const makeSignUpController = (): SignUpController => {
  const prismaAccountAddRepository = new PrismaAccountAddRepository()
  const prismaVerifyEmailRepository = new PrismaAccountAddRepository()
  return new SignUpController(
    prismaAccountAddRepository,
    prismaVerifyEmailRepository
  )
}
