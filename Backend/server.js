import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import {errorHandler,notFound} from './middleware/Errors.js'
import connectDB from './config/db.js'
import ProductRoutes from './Routes/productRoutes.js'
import UserRoute from './Routes/UserRoutes.js'
import OrderRoutes from './Routes/orderRoutes.js'
import uploadRoutes from './Routes/uploadRoutes.js'

dotenv.config()
connectDB()
const app = express()


app.use(cors())
app.use(express.json())

app.use('/api/products',ProductRoutes)
app.use('/api/users',UserRoute)
app.use('/api/orders',OrderRoutes)
app.use('/api/upload',uploadRoutes)


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/Frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'Frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)
