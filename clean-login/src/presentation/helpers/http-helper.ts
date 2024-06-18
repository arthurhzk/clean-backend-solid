import { ServerError } from '@/presentation/errors/server-error'
import { HttpResponse } from '@/presentation/protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.badRequest,
  body: error,
})

export const serverError = (): HttpResponse => ({
  statusCode: HttpStatusCode.serverError,
  body: new ServerError(),
})

export const ok = (data: any): HttpResponse => ({
  statusCode: HttpStatusCode.ok,
  body: data,
})

export const created = (data: any): HttpResponse => ({
  statusCode: HttpStatusCode.created,
  body: data,
})

export const conflict = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.conflict,
  body: error,
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.notFound,
  body: error,
})

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.unauthorized,
  body: error,
})

export const noContent = (): HttpResponse => ({
  statusCode: HttpStatusCode.noContent,
  body: null,
})
export const forbidden = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.forbidden,
  body: error,
})

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
  created = 201,
  conflict = 409,
}
