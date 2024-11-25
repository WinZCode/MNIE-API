import { create } from 'domain'
import { userModel } from '../models/userModel'

const createNew = async (reqBody: any) => {
  try {
    // Xử lý logic dữ liệus
    const newUser = {
      ...reqBody,
      createdAt: new Date()
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

export const userService = {
  createNew
}
