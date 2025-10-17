import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoute.js"
import userRoutes from "./routes/usersRoute.js"
import jobRoutes from "./routes/jobRoute.js"
/*import uploadRoute from "./routes/uploadRoute.js"*/
import connectDB from "./config/db.js"

const app=express()

dotenv.config()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:`*`,
    credentials:true,
}))
const PORT=process.env.PORT||8000

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/jobs',jobRoutes)
/*app.use('/api/upload',uploadRoute)*/

app.get('/api/test',(req,res)=>{
    res.send('Hello world')
})

app.listen(PORT,()=>{
    connectDB()
    console.log(`server is running on port ${PORT}`)
})