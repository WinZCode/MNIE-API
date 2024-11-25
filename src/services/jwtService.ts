import jwt from 'jsonwebtoken'
import { env } from '../config/environment'

export const generalAccessToken = async (payload: any) => {
  if (!env.ACCESS_TOKEN) {
    throw new Error('ACCESS_TOKEN is not defined')
  }
  const access_token = jwt.sign(
    {
      ...payload
    },
    env.ACCESS_TOKEN,
    { expiresIn: '30s' }
  )

  return access_token
}

export const generalRefreshToken = async (payload: any) => {
  if (!env.REFRESH_TOKEN) {
    throw new Error('REFRESH_TOKEN is not defined')
  }
  const refresh_token = jwt.sign(
    {
      ...payload
    },
    env.REFRESH_TOKEN,
    { expiresIn: '365d' }
  )

  return refresh_token
}
