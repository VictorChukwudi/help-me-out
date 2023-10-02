# Chrome Extension Backend
A backend api built for a chrome extension. It saves the video, provides a link to the video and do transcription using OpenAI's Whisper.

## Usage

The  API has the routes(endpoints) available for the api usage:

- **POST** /save-video : to save a video received from the frontend.


The route is appended to the base URL with is


```
https://help-me-backend.onrender.com
```

### Sample Response
 ```
    {
        "status": "success",
        "video_id":"6503164dc274bb1b8993e652",
        "user_id":"3dcd952a-299f-4793-8365-c5c109864cef",
        "video_url":"https://help-me-backend.onrender.com/63a9b435-cdfc-49a7-8a54-09147364586f-1696247663109.mp4",
        "transcript": "Some transcript text"
    }
```

### Note
To use the **/save-video** endpoint, append it to the base url.
