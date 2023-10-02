require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Video = require("../models/video");
const {Blob}=require("node:buffer");
const extractAudio = require("../utils/audio");
const getTranscript = require("../utils/transcript");

const baseURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:5000"
    : "https://help-me-backend.onrender.com";
const storagePath = `${path.join(__dirname, "./videos")}`;

const saveVideo = async (req, res) => {
  try {
    const videoChunks=req.files;
    const user_id = req.session.userId;
    const fileName=`${uuidv4()}-${Date.now()}`
    const videoName = `${fileName}.mp4`;
    const filePath = `${storagePath}/${videoName}`;

    const audioPath=`${storagePath}/${fileName}.mp3`
    if (!fs.existsSync(storagePath)) {
      fs.mkdirSync(storagePath);
    }
    
    const videoStream=fs.createWriteStream(filePath,{flags:"a"})

      for(const chunk of videoChunks){
        await videoStream.write(chunk)
      }
      await videoStream.close()

    const video = await new Video({
      user_id,
      video_url: `${baseURL}/${videoName}`,
    }).save();

    //Extract audio for transcription
extractAudio(filePath,audioPath)

    res.status(200).json({
      status: "success",
      video_id: video._id,
      user_id,
      video_url: video.video_url,
      // transcript:getTranscript(audioPath)
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
