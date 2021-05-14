const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db.js");

// get routes
const userRoutes = require("./routes/userRouter");
const expenseRoutes = require("./routes/expenseRouter");
const expenseCategoryRouter = require("./routes/expenseCategoryRouter");

dotenv.config();
connectDB();

const app = express();

app.use(cors({credentials: true, origin: true}));
app.use(express.json());

app.options("*", cors());

app.use("/api/auth", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/category", expenseCategoryRouter);

app.get("/", (req, res) => {
  res.send("API is running....");
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
