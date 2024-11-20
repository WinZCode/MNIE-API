import express from 'express'
import { CONNECT_DB, GET_DB } from './config/mongodb'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())

    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    console.log(`3. Hello , I am running at ${hostname}:${port}`)
  })
}

// chỉ khi kết nối DB thành công mới chạy BE
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
