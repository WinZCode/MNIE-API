import 'dotenv/config'

interface EnvironmentVariables {
  MONGODB_URI?: string | undefined
  DATABASE_NAME?: string
  APP_HOST?: string
  APP_PORT?: string
  AUTHOR?: string
}

export const env: EnvironmentVariables = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  AUTHOR: process.env.AUTHOR
}
