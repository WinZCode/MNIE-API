import { userModel } from '../models/userModel'
import { generalAccessToken, generalRefreshToken } from '../services/jwtService'
import bcrypt from 'bcrypt'

const createUser = async (reqBody: any) => {
  try {
    const existingUser = await userModel.findOneByEmail(reqBody.email)
    if (existingUser) {
      throw new Error('Email has been registered.')
    }

    const hashPassword = bcrypt.hashSync(reqBody.password, 10)
    const newUser = {
      ...reqBody,
      password: hashPassword
    }

    // Gọi tới tầng model để xử lý lưu bản ghi vào DB
    const createdUser = await userModel.createNew(newUser)

    // Lấy bản ghi sau khi gọi (tùy mục đích dự án có cần hay không)
    const getNewUser = await userModel.findOneById(createdUser.insertedId)

    return getNewUser
    // Có thể bắn email, noti về admin khi 1 board mới được tạo
  } catch (err) {
    throw err
  }
}

const loginUser = async (reqBody: any) => {
  try {
    const { email, password } = reqBody
    // Kiểm tra email tồn tại
    const existingUser = await userModel.findOneByEmail(email)
    if (!existingUser) {
      throw new Error('Email or password is incorrect')
    }

    // Kiểm tra password
    const isPasswordValid = bcrypt.compareSync(password, existingUser.password)
    if (!isPasswordValid) {
      throw new Error('Email or password is incorrect')
    }

    // Tạo payload cho JWT
    const payload = {
      id: existingUser._id,
      email: existingUser.email
    }

    // Tạo access token và refresh token
    const access_token = await generalAccessToken({
      id: existingUser.id,
      email: existingUser.email
    })

    const refresh_token = await generalRefreshToken({
      id: existingUser.id,
      email: existingUser.email
    })

    return {
      user: existingUser,
      access_token,
      refresh_token
    }
  } catch (err) {
    throw err
  }
}

export const userService = {
  createUser,
  loginUser
}
