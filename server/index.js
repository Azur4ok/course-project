import "dotenv/config"
import  express from "express";
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser";
import router from "./routes/index.js"
const PORT = process.env.PORT || 5000;

const app = express();

const {
    json
} = express;

app.use(json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use("/auth", router);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server started on ${PORT} port`))
    } catch (e) {
        console.log(e);
    }
}

start();
