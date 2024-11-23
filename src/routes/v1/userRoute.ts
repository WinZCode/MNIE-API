import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userValidation } from '../../validations/userValidation'
import { userController } from '../../controllers/userController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Get all users', code: StatusCodes.OK })
  })
  // Luồng hđ: validate => controllers (thông qua hàm next)
  .post(userValidation.createNew, userController.createNew)

export const userRouter = Router
