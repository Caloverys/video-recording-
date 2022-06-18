<!DOCTYPE html>

<html lang="en">
<meta charset="UTF-8">

<head>

<style>
  body{
    overflow: scroll;
  }
  video{
    transform: scaleX(-1);
  }

</style>

</head>

<body>
   <button id="id-stop-button" disabled>
      Stop and clear MediaStream
    </button>
    <h3 id="id-title">Device labels</h3>
    <div id="id-device-labels"></div>
  <video></video>
  <i class="fas fa-expand"></i>
  <script src='https://kit.fontawesome.com/44f674442e.js'></script>
  <button id='record_button'>Record</button>
  <button id='toggle_button'>Full screen</button>
  <button onclick='take_screen_shot()'>Take</button>
  <button id='screen_capture_button'>Take</button>
<script type="text/javascript">
  let constraints;
  let stream;
  const record_button = document.querySelector('#record_button');
  const toggle_button = document.querySelector('i.fas.fa-expand');
  const screen_capture_button = document.querySelector('#screen_capture_button')
  console.log(toggle_button)
 constraints = { audio: true, video: { width: 1280, height: 720 } };

  const video = document.querySelector('video')
navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {
  stream = mediaStream;
  video.srcObject = mediaStream; 
  video.onloadedmetadata = function(e) {
    video.play();
  };
  /*setTimeout(() => {
    const tracks = mediaStream.getTracks()
    console.log(tracks)
    tracks[0].stop()
  
  }, 5000)*/
})

record_button.addEventListener('click',function(){
record_video()
})

function record_video(){
   const recording = new MediaRecorder(stream,{
    mimeType: "video/webm",
  })
     setInterval(()=>console.log(video.duration))
   let data = [];
   recording.ondataavailable = event =>{
    data.push(event.data)
     console.log(data)
     console.log(event)
     const a = document.createElement('a')
     a.download  = 'videosksk.webm';
     a.href = URL.createObjectURL(event.data)
     a.textContent = a.download;
     document.body.appendChild(a)
     const video = document.createElement('video')
     video.src = URL.createObjectURL(event.data);
     console.log( URL.createObjectURL(event.data))
     toggle_button.onclick = ()=>{togglescreen(video)}
     //set controls property for video which makes user able to control the video element
     video.setAttribute('controls','controls')
     document.body.appendChild(video)
   } 
   recording.start();

   console.log(recording,recording.state)
   //setTimeout(()=>recording.stop(),2000)
  
}

function take_screen_shot(){


  const canvas = document.createElement('canvas')
  canvas.width = 640;
  canvas.height  =480;
  const context = canvas.getContext('2d')
  context.drawImage(video,0,0,canvas.width,canvas.height)
  const dataURL = canvas.toDataURL('image/jpg')
  console.log(dataURL)
   const a = document.createElement('a')
     a.download  = 'videosksk.jpg';
     a.href = dataURL
     a.textContent = a.download;
     document.body.appendChild(a)

}


function togglescreen(elem){
  if(!elem.fullScreenElement || !elem.mozFullScreen || !elem.webkitIsFullScreen){
     if (elem.requestFullScreen){
            elem.requestFullScreen();
        }
        else if (elem.mozRequestFullScreen){ /* Firefox */
            elem.mozRequestFullScreen();
        }
        else if (elem.webkitRequestFullScreen){   /* Chrome, Safari & Opera */
            elem.webkitRequestFullScreen();
        }
        else if (elem.msRequestFullscreen){ /* IE/Edge */
            elem.msRequestFullscreen();
        }
  }
  else
    {
        if (elem.cancelFullScreen){
           elem.cancelFullScreen();
        }
        else if (elem.mozCancelFullScreen){ /* Firefox */
            elem.mozCancelFullScreen();
        }
        else if (elem.webkitCancelFullScreen){   /* Chrome, Safari and Opera */
            elem.webkitCancelFullScreen();
        }
        else if (elem.msExitFullscreen){ /* IE/Edge */
            elem.msExitFullscreen();
        }
    }


}

screen_capture_button.addEventListener('click',function(){
  const displayMediaOptions = {
  video: {
    cursor: "always"
  },
  audio: false
};
navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then(screen_media=>{
  const recording = new MediaRecorder(screen_media)
  recording.ondataavailable= event =>{
    console.log('j')
    let videoElem = document.createElement("video");

  videoElem.width = 640;
  videoElem.height = 360;
  videoElem.autoplay = true;
  videoElem.setAttribute("playsinline", true);
      ///videoElem.srcObject = new MediaStream(screen_media.getTracks());
    videoElem.src = URL.createObjectURL(event.data)
  document.body.appendChild(videoElem);
  const a = document.createElement('a')
     a.download  = 'videosksk.webm';
     a.href = URL.createObjectURL(event.data)
     a.textContent = a.download;
     document.body.appendChild(a)

  }
  recording.start()
  
})
})


</script>  
</body>
