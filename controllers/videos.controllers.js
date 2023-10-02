require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Video = require("../models/video");

const baseURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:5000"
    : "https://help-me-backend.onrender.com";
const storagePath = `${path.join(__dirname, "./videos")}`;

const saveVideo = async (req, res) => {
  try {
    const { chunkData } = req.body;
    const user_id = req.session.userId;
    const fileName = `${uuidv4()}-${Date.now()}.mp4`;
    const filePath = `${storagePath}/${fileName}`;

    if (!fs.existsSync(storagePath)) {
      fs.mkdirSync(storagePath);
    }
    // const videoStream = fs.createWriteStream(filePath, { flags: "a" });
    // // chunkData.pipe(videoStream);

    // for (const chunk of chunkData) {
    //   videoStream.write(chunk, (err) => {
    //     if (err) {
    //       console.log(err);
    //       throw new Error("An error occurred");
    //     } else {
    //       console.log("video written successfully");
    //     }
    //   });
    // }

    // videoStream.close();
    const buffer=chunkData
    const blob= new Blob([buffer],{type: "video/mp4"})
    await fs.promises.appendFile(filePath,buffer)
    const video = await new Video({
      user_id,
      video_url: `${baseURL}/${fileName}`,
    }).save();

    res.status(200).json({
      status: "success",
      video_id: video._id,
      user_id,
      video_url: video.video_url,
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
  storagePath,
  saveVideo,
  findVideo,
  findUserVideos,
};
