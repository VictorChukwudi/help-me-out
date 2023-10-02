require("dotenv").config()
const axios=require("axios")
const fs =require("fs")
const path =require("path")
const FormData=require("form-data")

const OPENAI_KEY=process.env.OPENAI_KEY;
const model= "whisper-1"

const getTranscript=async(audioPath)=>{
    const formData= new FormData()
    formData.append("model",model)
    formData.append("file",fs.createReadStream(audioPath))

    const response=await axios.post("https://api.openai.com/v1/audio/transcriptions",formData,{
        headers:{
            Authorization:`Bearer ${OPENAI_KEY}`,
            "Content-Type":`multipart/form-data; boundary=${formData._boundary}`
        }
    })
    if(!response){
        console.log("error occurred");
        return 'could not fetch transcript'
    }else{
        return response.data.text
    }
}

module.exports=getTranscript