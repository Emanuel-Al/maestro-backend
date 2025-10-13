import express from "express";
import SongRoutes from "./routes/SongRoutes"
const app = express();
app.use(express.json());
app.use("/songs", SongRoutes)

app.get("/", (req,res) => {
    res.send("Servidor ok");
});

export default app;