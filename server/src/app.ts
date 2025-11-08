import express from "express";
import cors from "cors";
import productsRoute from "./routes/products";

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/products", productsRoute);

export default app;
