const express = require("express");

const { tramRouter } = require("./apiRoutes");

const router = express.Router();

router.use("/tram", tramRouter);

module.exports = router;
