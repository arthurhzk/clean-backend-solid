import jwt, { JwtPayload } from 'jsonwebtoken'
import { ok, unauthorized } from '@/presentation/helpers/http-helper'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import { env } from '@/main/env'
import { Middleware } from '@/presentation/protocols/middleware'
import { HttpResponse } from '@/presentation/protocols/http'

export class VerifyJwt implements Middleware {
  async handle(httpRequest: Request): Promise<HttpResponse> {
    const token = httpRequest.headers['x-access-token']
    if (!token) {
      unauthorized(new AccessDeniedError())
    }
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload
    if (!decoded.id) {
      throw new AccessDeniedError()
    }
    return ok({ id: decoded.id })
  }
}
