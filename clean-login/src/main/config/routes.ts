import { Express, Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import cors from 'cors'
import { makeSignUpController } from '@/presentation/controllers/sign-up-controller'
import { makeSignInController } from '@/presentation/controllers/sign-in-controller'
import { makeAddTaskController } from '@/presentation/controllers/add-task-controller'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '@/main/middlewares/auth-middleware'
export default (app: Express): void => {
  const router = Router()

  app.use(cors())
  app.use('/api', router)

  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/signin', adaptRoute(makeSignInController()))
  router.post(
    '/add',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeAddTaskController())
  )
}
