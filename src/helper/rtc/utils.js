// const constraintsVideo = {
//   audio: false,
//   video: {
//     width: {
//       exact: 500
//     },
//     height: {
//       exact: 500
//     }
//   }
// }
const constraintsVideo = {
  audio: false,
  video: true
}
const constraintsAudio = {
  audio: true,
  video: false
}


export const mediaStream = async (callback, audio = true, video = true) => {
  // const audioStream = await navigator.mediaDevices.getUserMedia(constraintsAudio)
  // const videoStream = await navigator.mediaDevices.getUserMedia(constraintsVideo)
  // const combinedStream = new MediaStream([...videoStream.getVideoTracks(), ...audioStream.getAudioTracks()]);
  // callback(combinedStream)
  // combinedStream.then((stream) => {
  //   callback(stream)
  // })
  window.navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression:true
    }, video
  }).then((stream) => {
    callback(stream)
  })
}