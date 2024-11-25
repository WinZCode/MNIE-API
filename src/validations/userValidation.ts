import Joi, { custom } from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'

/** Notes:
 * Không cần phải custom message ở BE vì để FE tự custom cho đẹp
 * BE chỉ cần validate chuẩn xác và trả về mess mặc định là dc
 * valid dữ liệu bắt buộc phải có ở BE vì đây là điểm cuối để lưu trữ và DB
 * Nên : Validate ở cả 2
 */

const createNew = async (req: any, res: any, next: any) => {
  const correctCond = Joi.object({
    email: Joi.string().email().lowercase().trim(),
    username: Joi.string().min(3).max(30).required().trim().strict().messages({
      'string.min': 'Username phải có ít nhất {#limit} ký tự',
      'string.max': 'Username không được vượt quá {#limit} ký tự',
      'any.required': 'Username là trường bắt buộc',
      'string.empty': 'Username không được để trống'
    }),

    password: Joi.string()
      .min(6)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)'))
      .required()
      .trim()
      .strict()
      .messages({
        'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
        'string.pattern.base': 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số',
        'any.required': 'Mật khẩu là trường bắt buộc',
        'string.empty': 'Mật khẩu không được để trống'
      })
  })

  try {
    // kiểm tra điều kiện validate khi gửi req lên
    // abortEarly: trả về nhiều lỗi, tất cả lỗi nếu có
    await correctCond.validateAsync(req.body, { abortEarly: false })

    // validate hợp lệ thì cho dữ liệu đi tiếp sang controller
    next()
  } catch (err: any) {
    const errorMessage = new Error(err).message

    // không thể thực thi 422
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)

    next(customError)
  }
}

export const userValidation = {
  createNew
}
