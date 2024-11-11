const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth/auth-route");

//create a database connection
mongoose
  .connect(
    "mongodb+srv://hsubhojit996:SCR7Hn1DnBRkAAnz@cluster0.5j064.mongodb.net/"
  )
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "cache-control",
      "expires",
      "pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
