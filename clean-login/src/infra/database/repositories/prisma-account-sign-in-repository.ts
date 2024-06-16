import { SignAccountRepository } from '@/data/protocols/sign-account-repository'
import { SignAccountModel } from '@/domain/models/sign-account-model'

import prisma from '@/infra/database'

export class PrismaAccountSignInRepository implements SignAccountRepository {
  async findByEmail(email: string): Promise<SignAccountModel> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
}
