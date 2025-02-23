import express from "express";
import path from "path";
import indexRouter from "./routes/indexRouter";
import dotenv from "dotenv";
import loginRouter from "./routes/loginRouter";
import dashboardRouter from "./routes/dashboardRouter";
import userRouter from "./routes/userRouter";
import { authAdmin, authJWT } from "./middleware/auth";
import cors from "cors";
import streakRouter from "./routes/streakRouter";
import webhookRouter from "./routes/webhookRouter";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://waffles-newscase-backend-production.up.railway.app/",
      "https://waffles-news-case-frontend.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/dashboard", authJWT, authAdmin, dashboardRouter);
app.use("/user", authJWT, userRouter);
app.use("/streaks", authJWT, streakRouter);
app.use("/webhook", webhookRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`listening to port: ${PORT} | http://localhost:${PORT}`));
