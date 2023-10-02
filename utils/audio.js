const {path}=require("@ffmpeg-installer/ffmpeg")
const {spawn}=require("child_process")
const {unlink}=require("node:fs/promises")

const extractAudio=async(videoPath,audioPath)=>{
    const audio = spawn(path,["-i",videoPath,audioPath])
    audio.on("exit",()=>{
        console.log("audio successfully extracted.");
        console.log(videoPath)
        console.log(audioPath)
    })
    audio.on("error",()=>{
        unlink(audioPath)
    })
}

module.exports=extractAudio