import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'
import { userService } from '../services/userService'

const createNew = async (req: any, res: any, next: any) => {
  try {
    // điều hướng dữ liệu sang tầng service
    const createdUser = await userService.createNew(req.body)

    // có kết quả thì trả về client
    res.status(StatusCodes.CREATED).json(createdUser)
  } catch (err: any) {
    next(err)
  }
}

export const userController = {
  createNew
}

//req.query: query string
//req.params: route params
//req.body: request body
