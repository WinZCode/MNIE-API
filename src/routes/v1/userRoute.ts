import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userValidation } from '../../validations/userValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Get all users', code: StatusCodes.OK })
  })
  .post(userValidation.createNew)

export const userRouter = Router
