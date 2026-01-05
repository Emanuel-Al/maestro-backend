import express from "express";
import SongRoutes from "./routes/SongRoutes"
import BandRoutes from "./routes/BandRoutes"
import TuningRoutes from "./routes/TuningRoutes"
import UserRoutes from "./routes/UserRoutes"
import cors from "cors";
import passport from "passport";
import { configurePassport } from "./config/passport";

const app = express();
app.use(passport.initialize());
configurePassport(passport);

const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/user", UserRoutes)
app.use("/songs", SongRoutes);
app.use("/bands", BandRoutes);
app.use("/tuning", TuningRoutes);

app.get("/", (req,res) => {
    res.send("Servidor ok");
});

export default app;