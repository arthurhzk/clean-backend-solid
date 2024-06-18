import { AddAccountRepository } from '@/data/protocols/add-account-repository'
import { AccountModel } from '@/domain/models/add-account-model'
import { AddAccountModel } from '@/domain/usecases/add-account'
import prisma from '@/infra/database'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'

export class PrismaAccountAddRepository implements AddAccountRepository {
  async verifyEmail(email: string): Promise<AccountModel> {
    return prisma.user.findFirst({
      where: {
        email: email,
      },
    })
  }
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const salt = 12
    const hashedPassword = await new BcryptAdapter(salt).hash(
      accountData.password
    )
    return prisma.user.create({
      data: { ...accountData, password: hashedPassword },
    })
  }
}
