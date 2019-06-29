import Express, { NextFunction, Request, Response } from 'express'
import { start } from './index'
import http from 'http'
import bodyParser from 'body-parser'

const app = Express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS')
  next()
})

app.post(
  '/',
  (req: Request, res: Response): void => {
    const { subject, mailBody } = req.body

    try {
      ;(async () => {
        await start({ subject, mailBody })
        res.json({ success: true })
      })()
    } catch (e) {
      res.json({ success: false, course: e.message })
    }
  }
)

const server: http.Server = app.listen(3000, () => {
  console.log(`start server at ${server}`)
})
