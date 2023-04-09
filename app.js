const express = require("express");
const cors = require("cors");
const app = express();
const studentsRouter = require("./app/routes/router");

app.use(cors());
app.use(express.json());
app.use("/api/students",studentsRouter);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to nodejs" });
});


app.use("/api/contacts", studentsRouter);

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