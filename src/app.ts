import express from "express";
import SongRoutes from "./routes/SongRoutes"
import cors from "cors";

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
};

app.use(cors(corsOptions))
app.use(express.json());
app.use("/songs", SongRoutes);

app.get("/", (req,res) => {
    res.send("Servidor ok");
});

export default app;