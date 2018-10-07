const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

const apiRouter = require("./routes/api");

app.use(cors());

app.use(bodyParser.json());

app.use("/api", apiRouter);

app.use("/*", (req, res, next) => {
  res.status(404).send({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.status !== undefined)
    res.status(err.status).send({ message: err.message });
  else next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: "Internal server error" });
});

module.exports = app;
