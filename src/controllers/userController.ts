import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'

const createNew = async (req: any, res: any, next: any) => {
  try {
    console.log('body', req.body)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Create user error')

    // có kết quả thì trả về client
    // res.status(StatusCodes.CREATED).json({ message: 'Create user', code: StatusCodes.CREATED })
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
// điều hướng dữ liệu sang tầng service
