import express from "express";
import plantsRouter from './routers/plants.js'

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/plants', plantsRouter)


export default app;
