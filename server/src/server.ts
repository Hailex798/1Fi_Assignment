import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/db";
import cors from "cors";
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI!;

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://1-fi-assignment-dun.vercel.app"
      ];

      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("Blocked origin:", origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);
console.log("Starting server...");
console.log(`Connecting to MongoDB at ${MONGO_URI}...`);
(async () => {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => console.log(`🚀 API http://localhost:${PORT}`));
})();
