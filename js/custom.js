const partsHouse = document.querySelectorAll(".parts-house")
const indicatorsSlide = document.querySelectorAll(".indicators-slide")
const carouselsItem = document.querySelectorAll(".carousel-item")
const sections = document.getElementById("sections")
const containerVideo = document.querySelector(".container-video")
const videoId = "ByBkOs_3qk4"

function iniciarMap() {
  var coord = { lat: -34.5956145, lng: -58.4431949 };
  new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: coord
  });
}

if (/iPhone/i.test(navigator.userAgent)) {
  Iphone().catch(error => console.log(error))
} else {
  AllDeviceExpectIphone().catch(error => console.log(error))
}

indicatorsSlide.forEach(indicatorSlide => {
  indicatorSlide.addEventListener("click", () => {
    carouselsItem.forEach(element => element.classList.remove("active"))
    carouselsItem[indicatorSlide.getAttribute("index")].classList.add("active")
  })
})

async function Iphone(){
  containerVideo.innerHTML = `<video id='iphoneVideo' class='player video-js vjs-default-skin vjs-big-play-centered' crossorigin='anonymous' preload='metadata' autoplay controls><source src='https://www.googleapis.com/drive/v3/files/1wtzdbEy2JLThaPcBIAFYrQ4xjYt6vs86?alt=media&key=AIzaSyDzluYHUntGNcKQYC680LO6SPDh2Wg_1_Q' type='video/mp4'></video>`
  await loadScript('https://vjs.zencdn.net/5.10.4/video.js');
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r76/three.js');
  await loadScript('https://rawgit.com/yanwsh/videojs-panorama/master/dist/videojs-panorama.v5.js');
  const options = {
    plugins: {
      panorama: {
        clickAndDrag: true,
        clickToToggle: true,
        autoMobileOrientation: true,
        backToVerticalCenter: false,
        backToHorizonCenter: false
      }
    }
  };
  const player = videojs('iphoneVideo', options, function () { });
  const screenSize = document.querySelector(".vjs-fullscreen-control.vjs-control.vjs-button")
  player.on('fullscreenchange', async () => {
    if (player.isFullscreen()) return
    await new Promise(res => setTimeout(res, 500))
    const canvas = document.querySelector(".vjs-video-canvas")
    canvas.style = "width: 100%;height: 100%"
  });

  window.addEventListener("orientationchange", function() {
    try{
      if(player.isFullscreen()){
        screenSize.click()
      }else{
        const canvas = document.querySelector(".vjs-video-canvas")
        canvas.style = "width: 100%;height: 100%"
      }
    }catch(error){
      console.log(error)
    }
  });
  changeTimeLine(time => player.currentTime(time))
}


async function AllDeviceExpectIphone() {
  await loadScript('https://www.youtube.com/iframe_api');
}

function onYouTubeIframeAPIReady() {
  containerVideo.innerHTML = `<div id="deviceVideo"></div>`
  const player = new YT.Player('deviceVideo', {
    videoId,
    playerVars: {
      modestbranding: 1,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
      autoplay: 0, // Autoplay is disabled
    }
  });
  changeTimeLine(time => player.seekTo(time))
}



const changeTimeLine = (cb) => {
  sections.addEventListener("change", (e) => {
    cb(e.target.value)
  })

  partsHouse.forEach(part => {
    part.addEventListener("click", () => {
      const value = part.getAttribute("value")
      cb(value)
    })
  })
}

// Function to dynamically load a script
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

var myModal = new bootstrap.Modal(document.getElementById('dealer'))
myModal.show()
