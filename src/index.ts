import express, { Application, Request, Response } from 'express'

const PORT = process.env.PORT || 3000

const app: Application = express()

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello world 🌏🌏'
  })
})

app.listen(PORT, () => {
  console.log(`App listening on ::${PORT}`)
})

export default app
