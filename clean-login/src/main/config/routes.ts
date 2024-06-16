import { Express, Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import cors from 'cors'
import { makeSignUpController } from '@/presentation/controllers/sign-up-controller'
import { makeSignInController } from '@/presentation/controllers/sign-in-controller'
import { adaptMiddleware } from '@/main/adapters/express-middleware-adapter'
import { VerifyJwt } from '@/main/middlewares/verify-jwt'
export default (app: Express): void => {
  const adaptedMiddleware = adaptMiddleware(new VerifyJwt())

  const router = Router()
  app.use('/api', router)
  app.use(cors())

  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/signin', adaptRoute(makeSignInController()))
}
