const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");

// Routes
const userApi = require("./routes/user");
const CatApi = require("./routes/categories");
const PodcastApi = require("./routes/podcast");

// Middleware
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Route Handlers
app.use("/api/v1", userApi);
app.use("/api/v1", CatApi);
app.use("/api/v1", PodcastApi);

// Start Server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
