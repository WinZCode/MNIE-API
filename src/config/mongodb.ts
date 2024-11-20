import { Db, MongoClient, ServerApiVersion } from 'mongodb'

const MONGODB_URI =
  'mongodb+srv://ngothang101102:FeL966RvL4n0wKSY@mnie-cluster.zwjuj.mongodb.net/?retryWrites=true&w=majority&appName=MNIE-Cluster'

const DATABASE_NAME = 'mnie-project-database'

// khởi tạo ban đầu là null vì chưa connect db
let mnieDatabaseInstance: Db | null = null

// khởi tạo đối tượng để connect db
const mongoClientInstance = new MongoClient(MONGODB_URI, {
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

  mnieDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}

export const GET_DB = (): Db => {
  if (!mnieDatabaseInstance) throw new Error('Must connect to database first')
  return mnieDatabaseInstance
}
