import { SignAccountRepository } from '@/data/protocols/sign-account-repository'
import { SignAccountModel } from '@/domain/models/sign-account-model'

export class DbSignAccount implements SignAccountRepository {
  constructor(private readonly signAccountRepository: SignAccountRepository) {}
  findByEmail(email: string): Promise<SignAccountModel> {
    return this.signAccountRepository.findByEmail(email)
  }
  findById(id: string): Promise<SignAccountModel> {
    return this.signAccountRepository.findById(id)
  }
}
