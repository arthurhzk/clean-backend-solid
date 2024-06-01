/* eslint-disable prettier/prettier */
import { Express, Router } from 'express'
import signupRoutes from '../../../src/main/routes/signup-routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  signupRoutes(router)
}
