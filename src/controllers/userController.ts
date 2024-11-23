import { StatusCodes } from 'http-status-codes'

const createNew = async (req: any, res: any, next: any) => {
  res.status(StatusCodes.OK).json({ message: 'Create new user', code: StatusCodes.OK })

  try {
    console.log('body', req.body)
    res.status(StatusCodes.CREATED).json({ message: 'Create user', code: StatusCodes.CREATED })
  } catch (err: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: err.message })
  }
}

export const userController = {
  createNew
}

//req.query: query string
//req.params: route params
//req.body: request body
