import React, { useEffect } from "react";
import { useRef } from "react";

function Video({ id, stream }) {
  const ref = useRef();
  useEffect(() => {
    setTimeout(() => {
      ref.current.src = window.URL.createObjectURL(stream);
      // ref.current.srcObject = stream;
    }, 500);
  }, [stream]);

  return (
    <video
      controls={false}
      playsInline={true}
      muted={false}
      autoPlay={true}
      ref={ref}
      id={id}
    />
  );
}

export default Video;
