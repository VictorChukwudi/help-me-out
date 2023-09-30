const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Video = require("../models/video");

const storagePath = `${path.join(__dirname, "./videos")}`;

const saveVideo = async (req, res) => {
  try {
    const { chunkData, video_name } = req.body;
    const user_id = req.session.userId;
    const filePath = `${storagePath}/${video_name}.mp4`;

    if (!fs.existsSync(storagePath)) {
      fs.mkdirSync(storagePath);
    }
    const videoStream = fs.createWriteStream(filePath, { flags: "a" });
    chunkData.pipe(videoStream);

    videoStream.on("finish", () => {
      const video = new Video({
        user_id,
        video_url: filePath,
      }).save();
      res.status(200).json({
        status: "success",
        data: {
          video_id: video._id,
          user_id,
          video_url: video.video_url,
        },
      });
    });

    videoStream.on("error", (error) => {
      console.log(error);
      throw new Error("An error occurred when saving video.");
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
};

const findVideo = async (req, res) => {
  try {
    const user_id = req.session.userId;
    const { video_id } = req.params;
    const video = await Video.findById(video_id);
    if (!video) {
      res.status(400);
      throw new Error("Video not found.");
    } else {
      res.status(200).json({
        status: "success",
        data: video,
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
};
const findUserVideos = async (req, res) => {
  try {
    const user_id = req.session.userId;
    const videos = await Video.find({ user_id });
    if (!videos) {
      res.status(400);
      throw new Error("Videos not found.");
    } else {
      res.status(200).json({
        status: "success",
        data: videos,
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
};
module.exports = {
  saveVideo,
  findVideo,
  findUserVideos,
};
