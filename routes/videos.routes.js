const express = require("express");
const { saveVideo } = require("../controllers/videos.controllers");
const guestSession = require("../middleware/session.middleware");
const router = express.Router();

router.get("/", guestSession, saveVideo);

module.exports = router;
