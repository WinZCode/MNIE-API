import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '../utils/validator'
import { GET_DB } from '../config/mongodb'

// Interface cho User
export interface IUser {
  id: string
  email: string
  username: string
  password: string
  isActive: boolean
  roles: string[]
  lastLogin: Date
  createdAt: Date
  updatedAt: Date | null
  verifyToken: string | null
}

const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  //  id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  email: Joi.string().email().lowercase().trim(),
  username: Joi.string().min(3).max(30).required().trim().strict(),
  password: Joi.string().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)')).required().trim().strict(),
  isActive: Joi.boolean().default(true),
  roles: Joi.array().items(Joi.string().valid('client', 'admin')).default(['client']),
  lastLogin: Joi.date(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  verifyToken: Joi.string().allow(null).default(null)
})

const validateBeforeCreate = async (data: any) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data: any) => {
  try {
    const validData = await validateBeforeCreate(data)
    return await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)
  } catch (err: any) {
    throw new Error(err)
  }
}

const findOneById = async (id: any) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: id })
  } catch (err: any) {
    throw new Error(err)
  }
}

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  findOneById,
  createNew
}
