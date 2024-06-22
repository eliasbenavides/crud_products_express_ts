import express from 'express'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import router from './router'
import db from './config/db'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'


// Connection with data base
export async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    // console.log(colors.green.bold('Connection with DB is successfully'))
  } catch (error) {
    // console.log(error)
    console.log(colors.red.bold('An error was ocurred with the connection to the DB'))
  }
}

connectDB()

// Express Instance
const server = express()

// admit conexions

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true)
    } else {
      callback(new Error('Error de CORS'))
    }
  }
}
server.use(cors(corsOptions))
// Read data from forms
server.use(express.json())

server.use(morgan('dev'))

//Routing
server.use('/api/products', router)

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server