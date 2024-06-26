/* eslint-disable prettier/prettier */
import { EmailValidator, AccountModel, AddAccount } from './signup-protocols'
import { SignUpController } from './signup'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'valid_password',
      }
      return new Promise((resolve) => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}
const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)
  return { sut, emailValidatorStub, addAccountStub }
}

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect((await httpResponse).statusCode).toBe(400)
    expect((await httpResponse).body).toEqual(new MissingParamError('name'))
  })
  it('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect((await httpResponse).statusCode).toBe(400)
    expect((await httpResponse).body).toEqual(new MissingParamError('email'))
  })
  it('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        passwordConfirmation: 'any_password',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect((await httpResponse).statusCode).toBe(400)
    expect((await httpResponse).body).toEqual(new MissingParamError('password'))
  })
  it('Should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect((await httpResponse).statusCode).toBe(400)
    expect((await httpResponse).body).toEqual(
      new MissingParamError('passwordConfirmation')
    )
  })
  it('Should return 400 if password confirmation fails', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'invalid_password',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect((await httpResponse).statusCode).toBe(400)
    expect((await httpResponse).body).toEqual(
      new InvalidParamError('passwordConfirmation')
    )
  })
  it('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect((await httpResponse).statusCode).toBe(400)
    expect((await httpResponse).body).toEqual(new InvalidParamError('email'))
  })
  it('Should return 500 if email validator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect((await httpResponse).statusCode).toBe(500)
    expect((await httpResponse).body).toEqual(new ServerError())
  })
  it('Should return 500 if addAccount validator throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect((await httpResponse).statusCode).toBe(500)
    expect((await httpResponse).body).toEqual(new ServerError())
  })

  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })
  it('Should call AddAccount with correct values', () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }
    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    })
  })
  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'valid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect((await httpResponse).statusCode).toBe(200)
    expect((await httpResponse).body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    })
  })
})
