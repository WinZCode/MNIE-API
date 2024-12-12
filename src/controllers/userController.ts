import { StatusCodes } from 'http-status-codes'
import { userService } from '../services/userService'
import { env } from '../config/environment'

const createUser = async (req: any, res: any, next: any) => {
  try {
    // điều hướng dữ liệu sang tầng service
    const createdUser = await userService.createUser(req.body)

    // có kết quả thì trả về client
    res.status(StatusCodes.CREATED).json(createdUser)
  } catch (err: any) {
    next(err)
  }
}

const loginUser = async (req: any, res: any, next: any) => {
  try {
    // điều hướng dữ liệu sang tầng service
    const response = await userService.loginUser(req.body)
    const { refresh_token, ...newResponse } = response

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/'
    })

    // có kết quả thì trả về client
    res.status(StatusCodes.CREATED).json({ ...newResponse, refresh_token })
  } catch (err: any) {
    next(err)
  }
}

const logoutUser = async (req: any, res: any) => {
  try {
    res.clearCookie('refresh_token')
    return res.status(StatusCodes.OK).json({
      status: 'OK',
      message: 'Logout successfully'
    })
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: e
    })
  }
}

const getDetailsUser = async (req: any, res: any) => {
  try {
    const userId = req.params.id
    if (!userId) {
      return res.status(StatusCodes.OK).json({
        status: 'ERR',
        message: 'The userId is required'
      })
    }
    const response = await userService.getDetailsUser(userId)
    return res.status(StatusCodes.OK).json(response)
  } catch (e) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: e
    })
  }
}

// const refreshToken = async (req: any, res: any) => {
//   try {
//     let token = req.headers.token.split(' ')[1]
//     if (!token) {
//       return res.status(StatusCodes.OK).json({
//         status: 'ERR',
//         message: 'The token is required'
//       })
//     }
//     const response = await refreshTokenJwtService(token)
//     return res.status(StatusCodes.OK).json(response)
//   } catch (e) {
//     return res.status(StatusCodes.NOT_FOUND).json({
//       message: e
//     })
//   }
// }

export const userController = {
  createUser,
  loginUser,
  logoutUser,
  getDetailsUser
}

//req.query: query string
//req.params: route params
//req.body: request body
