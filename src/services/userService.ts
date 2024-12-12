import { userModel } from '../models/userModel'
import { generalAccessToken, generalRefreshToken } from '../services/jwtService'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'

const createUser = async (reqBody: any) => {
  try {
    // Loại bỏ confirmPassword trước khi xử lý
    const { confirmPassword, ...userData } = reqBody

    const existingUser = await userModel.findOneByEmail(userData.email)
    if (existingUser) {
      throw new Error('Email has been registered.')
    }

    const hashPassword = bcrypt.hashSync(userData.password, 10)
    const newUser = {
      ...userData,
      password: hashPassword
    }

    // Gọi tới tầng model để xử lý lưu bản ghi vào DB
    const createdUser = await userModel.createNew(newUser)

    // Lấy bản ghi sau khi gọi (tùy mục đích dự án có cần hay không)
    const getNewUser = await userModel.findOneById(createdUser.insertedId)

    return getNewUser
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
    const access_token = await generalAccessToken(payload)

    const refresh_token = await generalRefreshToken(payload)

    return {
      ...existingUser,
      access_token,
      refresh_token
    }
  } catch (err) {
    throw err
  }
}

const getDetailsUser = (id: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const objectId = ObjectId.isValid(id) ? new ObjectId(id) : null
      const user = await userModel.findOneById(objectId)

      if (user === null) {
        resolve({
          status: 'ERR',
          message: 'The user is not defined 222'
        })
      }
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: user
      })
    } catch (e) {
      reject(e)
    }
  })
}

export const userService = {
  createUser,
  loginUser,
  getDetailsUser
}
