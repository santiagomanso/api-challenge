import express from 'express'
import dotenv from 'dotenv'
import { pokemonRouter } from './routes/pokemon-router'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import path from 'path'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.disable('x-powered-by')

const PORT = process.env.SERVER_PORT || 4000

app.use(express.json())

const publicPath = __dirname
app.use('/', express.static(publicPath))

app.use('/mypokeapi/', pokemonRouter)

app.use((req, res) => {
  return res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () => {
  console.log(chalk.cyanBright.bold.inverse('Server listening in port', PORT))
})
