const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Video = require("../models/video");

const saveVideo = async (req, res) => {
  try {
    const { chunkData, video_name } = req.body;
    const user_id = req.session.userId;
    const filePath = `${path.join(__dirname, "./videos")}/${video_name}.mp4`;

    const videoStream = fs.createWriteStream(filePath, { flags: "a" });
    chunkData.pipe(videoStream);

    videoStream.on("finish", () => {
      const video = new Video({
        user_id,
        video_url,
      }).save();
      res.status(200).json({
        status: "success",
        data: video,
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
  } catch (error) {}
};
module.exports = {
  saveVideo,
};
