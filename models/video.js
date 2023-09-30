const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const videoSchema = Schema({
  user_id: {
    type: String,
  },
  video_url: {
    type: String,
  },
});

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
