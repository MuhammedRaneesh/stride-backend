import { registerSchema , loginSchema } from "../validation/authValidation.js";
import express from "express"
import { registerUser  , loginUser } from "../controllers/authController.js";
import { validate } from "../middleware/validateMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router()

router.post("/register" , validate(registerSchema) , registerUser) 

router.post("/login" , validate(loginSchema) , loginUser)



export default router
