import { SignAccountModel } from '@/domain/models/sign-account-model'

export interface SignInAccountModel {
  email: string
  password: string
}

export interface SignAccount {
  sign(account: SignInAccountModel): Promise<SignAccountModel>
}
