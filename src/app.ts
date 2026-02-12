import express from "express";
import SongRoutes from "./routes/SongRoutes";
import BandRoutes from "./routes/BandRoutes";
import TuningRoutes from "./routes/TuningRoutes";
import UserRoutes from "./routes/UserRoutes";
import cors from "cors";
import passport from "passport";
import { configurePassport } from "./config/passport";

const app = express();
app.use(passport.initialize());
configurePassport(passport);

const allowedOrigins = [
  "https://maestro-phi.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS policy"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
  
app.use(express.json());
app.use("/user", UserRoutes);
app.use("/songs", SongRoutes);
app.use("/bands", BandRoutes);
app.use("/tuning", TuningRoutes);

app.get("/", (req, res) => {
  res.send("Servidor ok");
});

export default app;
