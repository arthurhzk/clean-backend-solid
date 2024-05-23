export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`Invalic param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
