const createNew = async (reqBody: any) => {
  try {
    // Xử lý logic dữ liệus
    const newUser = {
      ...reqBody,
      createdAt: new Date()
    }

    // Gọi tới tầng model để xử lý lưu bản ghi vào DB
    // Có thể bắn email, noti về admin khi 1 board mới được tạo

    return newUser
  } catch (err) {
    throw err
  }
}

export const userService = {
  createNew
}
