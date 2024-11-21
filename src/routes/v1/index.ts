import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userRouters } from './userRoutes'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API v1 is ready to use', code: StatusCodes.OK })
})

// users api
Router.use('/users', userRouters)

export const APIs_V1 = Router
