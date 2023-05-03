const express = require("express");
const cors = require("cors");

const studentRouter = require("./app/routes/route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
   res.json({ message: "Welcome to contact book application."});
});

app.use("/api/StudentsManager", studentRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
  
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        error: {
          status: error.statusCode || 500,
          message: error.message || 'Internal Server Error',
        },
      });
});
    
module.exports = app;