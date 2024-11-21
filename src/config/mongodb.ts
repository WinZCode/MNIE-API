import { Db, MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'

// khởi tạo ban đầu là null vì chưa connect db
let mnieDatabaseInstance: Db | null = null

// khởi tạo đối tượng để connect db
const mongoClientInstance = new MongoClient(env.MONGODB_URI!, {
  // Chỉ định version ổn định cho api server (stable api)
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// kết nối db
export const CONNECT_DB = async () => {
  // gọi kết nối tới atlas với uri ở client instance
  await mongoClientInstance.connect()

  mnieDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = (): Db => {
  if (!mnieDatabaseInstance) throw new Error('Must connect to database first')
  return mnieDatabaseInstance
}

// đóng kết nối db khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}
