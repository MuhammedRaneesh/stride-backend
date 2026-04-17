import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import cors from "cors"

// routes 
import authRoutes from "./routes/authRoutes.js"


dotenv.config();
const app = express()
connectDb() ;

app.use(cors())
app.use(express.json())


app.use("/api/auth", authRoutes)



const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
})

