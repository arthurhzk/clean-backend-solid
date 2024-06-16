import { AddAccountModel } from '@/domain/usecases/add-account'
import { AddAccountRepository } from '../protocols/add-account-repository'
import { AccountModel } from '@/domain/models/add-account-model'

export class DbAddAccount implements AddAccountRepository {
  constructor(private readonly addAccountRepository: AddAccountRepository) {}

  add(accountData: AddAccountModel): Promise<AccountModel> {
    return this.addAccountRepository.add(accountData)
  }
  verifyEmail(email: string): Promise<AccountModel> {
    return this.addAccountRepository.verifyEmail(email)
  }
}
