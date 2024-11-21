import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb'
import { env } from './config/environment'
const START_SERVER = () => {
  const app = express()
  const port = Number(env.APP_PORT)
  const host = env.APP_HOST || 'localhost'

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, host, () => {
    console.log(`3. Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}`)
  })

  // clean up sau khi đóng server
  exitHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log('5. Database disconnected!')
  })
}

// chỉ khi kết nối DB thành công mới chạy BE
// IIFE
;(async () => {
  try {
    console.log('1. Connecting to database...')
    await CONNECT_DB()
    console.log('2. Database connected!')
    START_SERVER()
  } catch (err) {
    console.log(err)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('2. Database connected!'))
//   .then(() => START_SERVER())
//   .catch((err) => {
//     console.log(err)
//     process.exit(0)
//   })
