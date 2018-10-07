const express = require("express");

const { sendTramTimes } = require("../../controllers/tram");

const router = express.Router();

router.get("/", sendTramTimes);

module.exports = router;
