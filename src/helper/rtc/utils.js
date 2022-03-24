export const mediaStream = async (callback, audio = true, video = true) => {
  window.navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true
    },
     video:false
  }).then((stream) => {
    callback(stream)
  })
}