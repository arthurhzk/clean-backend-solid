import { AccountModel } from '@/domain/models/add-account-model'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add(account: AddAccountModel): Promise<AccountModel>
}
