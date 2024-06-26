import { SignAccountModel } from '@/domain/models/sign-account-model'

export interface SignAccountRepository {
  findByEmail(email: string): Promise<SignAccountModel | null>
}
