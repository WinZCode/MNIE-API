// import jwt from 'jsonwebtoken'
// import { env } from '../config/environment'

// const authMiddleWare = (
//   req: { headers: { token: string } },
//   res: {
//     status: (arg0: number) => {
//       (): any
//       new (): any
//       json: { (arg0: { message: string; status: string }): any; new (): any }
//     }
//   },
//   next: () => void
// ) => {
//   const token = req.headers.token.split(' ')[1]
//   jwt.verify(token, env.ACCESS_TOKEN, function (err: any, user: { isAdmin: any }) {
//     if (err) {
//       return res.status(404).json({
//         message: 'The authemtication',
//         status: 'ERROR'
//       })
//     }
//     if (user?.isAdmin) {
//       next()
//     } else {
//       return res.status(404).json({
//         message: 'The authemtication',
//         status: 'ERROR'
//       })
//     }
//   })
// }

// const authUserMiddleWare = (
//   req: { headers: { token: string }; params: { id: any } },
//   res: {
//     status: (arg0: number) => {
//       (): any
//       new (): any
//       json: { (arg0: { message: string; status: string }): void; new (): any }
//     }
//   },
//   next: () => void
// ) => {
//   const token = req.headers.token.split(' ')[1]
//   const userId = req.params.id
//   jwt.verify(token, env.ACCESS_TOKEN, function (err, user) {
//     if (err) {
//       return res.status(404).json({
//         message: 'The authemtication',
//         status: 'ERROR'
//       })
//     }
//     if (user?.isAdmin || user?.id === userId) {
//       next()
//     } else {
//       return res.status(404).json({
//         message: 'The authemtication',
//         status: 'ERROR'
//       })
//     }
//   })
// }
