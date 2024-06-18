import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import { forbidden, ok } from '@/presentation/helpers/http-helper'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Middleware } from '@/presentation/protocols/middleware'

import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import { env } from '@/main/env'

export class AuthMiddleware implements Middleware {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const token = httpRequest.headers?.['x-access-token']
    if (!token) {
      return forbidden(new AccessDeniedError())
    }

    const jwt = new JwtAdapter(env.JWT_SECRET)
    const decoded = await jwt.decrypt(token)

    global.decoded = decoded
    return ok(decoded)
  }
}

declare global {
  namespace NodeJS {
    interface Global {
      decoded: object
    }
  }
}

const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware()
}
