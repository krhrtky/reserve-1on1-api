import Express, { Request, Response } from 'express'
import { start } from './index'

const app = Express()

app.get(
  '/',
  (req: Request, res: Response): void => {
    try {
      ;(async () => {
        await start()
        res.json({ success: false })
      })()
    } catch (e) {
      res.json({ success: false, casuse: e.message })
    }
  }
)

const server = app.listen(3000, () => {
  console.log('start server at')
})
