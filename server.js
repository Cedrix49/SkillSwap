import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js";
import cloudinaryTestRoute from './routes/cloudinaryTest.js';
import authRouter from "./routes/authRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import skillRouter from "./routes/skillSwapRoutes.js";
import userRouter from "./routes/userRoutes.js";



connectDB();

const app = express();
const PORT= process.env.PORT || 5000;

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    credentials: true,
}))

app.get('/', (req, res) => {
    res.send('API Working')
})

//Api Endpoints
app.use('/api', cloudinaryTestRoute);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/user', userRouter);
app.use('/api/skill', skillRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})