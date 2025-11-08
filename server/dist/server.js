"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
console.log("Starting server...");
console.log(`Connecting to MongoDB at ${MONGO_URI}...`);
(async () => {
    await (0, db_1.connectDB)(MONGO_URI);
    app_1.default.listen(PORT, () => console.log(`🚀 API http://localhost:${PORT}`));
})();
