const express = require("express");
const multer=require("multer")
const {
  saveVideo,
  findVideo,
  findUserVideos,
} = require("../controllers/videos.controllers");
const guestSession = require("../middleware/session.middleware");
const router = express.Router();

router.get("/api", (req, res) => {
  res.send("working");
});
router.post("/save-video", guestSession, multer().array("chunkData"),saveVideo);
router.get("/all--videos", guestSession, findUserVideos);
router.get("/single-video/:video_id", findVideo);

module.exports = router;
