import { HttpStatusCode } from '@/presentation/helpers/http-helper'
import { Middleware } from '@/presentation/protocols/middleware'
import { Request, Response, NextFunction } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.['x-access-token'],
    }
    const httpResponse = await middleware.handle(request)
    if (httpResponse.statusCode === HttpStatusCode.ok) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      })
    }
  }
}
