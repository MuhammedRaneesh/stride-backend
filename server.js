import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import cors from "cors"
import cookieParser from "cookie-parser"

// routes 
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoute.js"
import cartRoutes from "./routes/cartRoutes.js"

dotenv.config();
connectDb() ;
const app = express()

app.use(cookieParser())
app.use(express.json())



app.use("/api/auth", authRoutes)
app.use("/api/product" , productRoutes )
app.use("/api/cart", cartRoutes )


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
})

