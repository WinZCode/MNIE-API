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

// export const refreshTokenJwtService = (token: any) => {
//   return new Promise((resolve, reject) => {
//     try {
//       jwt.verify(token, env.REFRESH_TOKEN, async (err, user) => {
//         if (err) {
//           resolve({
//             status: 'ERR',
//             message: 'Authentication requied'
//           })
//         }
//         const access_token = await generalAccessToken({
//           id: user?.id,
//           isAdmin: user?.isAdmin
//         })
//         resolve({
//           status: 'OK',
//           message: 'SUCESS',
//           access_token
//         })
//       })
//     } catch (e) {
//       reject(e)
//     }
//   })
// }
