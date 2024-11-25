import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userRouter } from './userRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API v1 is ready to use', code: StatusCodes.OK })
})

// users api
Router.use('/api/user', userRouter)

export const APIs_V1 = Router
