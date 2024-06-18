import { HttpStatusCode } from '@/presentation/helpers/http-helper'
import { Middleware } from '@/presentation/protocols/middleware'

import { Request, Response, NextFunction } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      headers: {
        'x-access-token': req.headers?.['x-access-token'],
        ...(req.headers || {}),
      },
    }
    const httpResponse = await middleware.handle(request)
    console.log(request)
    if (httpResponse.statusCode === HttpStatusCode.ok) {
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      })
    }
  }
}
