import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Talk from frontend to backend allow
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

// To take data as a json form
app.use(
    express.json({
        limit: "16kb",
    })
);

// To take data as a Url form
app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);

// To allow some data for public (any one can access)
app.use(express.static("public"));
app.use(cookieParser());


// routes import 
import userRouter from './routes/user.routes.js'


// routers declaration
app.use("/api/v1/users",userRouter)

export default app;
