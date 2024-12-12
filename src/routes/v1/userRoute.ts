import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userValidation } from '../../validations/userValidation'
import { userController } from '../../controllers/userController'

const Router = express.Router()

Router.route('/sign-up')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Get users', code: StatusCodes.OK })
  })
  // Luồng hđ: validate => controllers (thông qua hàm next)
  .post(userValidation.createUser, userController.createUser)

Router.route('/sign-in').post(userValidation.loginUser, userController.loginUser)
Router.route('/log-out').post(userController.logoutUser)
Router.route('/get-details/:id').get(userController.getDetailsUser)
export const userRouter = Router
