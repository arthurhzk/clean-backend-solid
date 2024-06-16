import { AccountModel } from '@/domain/models/add-account-model'
import { AddAccountModel } from '@/domain/usecases/add-account'

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>
  verifyEmail(email: string): Promise<AccountModel | null>
}
