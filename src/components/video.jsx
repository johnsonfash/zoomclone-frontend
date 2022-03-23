import React, { useEffect } from "react";
import { useRef } from "react";

function Video({ id, stream }) {
  const ref = useRef();
  useEffect(() => {
    ref.current.srcObject = stream;
    ref.current.addEventListener("loadedmetadata", () => {
      ref.current.play();
    });
  }, [stream]);

  return (
    <video
      controls={false}
      playsInline={true}
      muted={false}
      ref={ref}
      id={id}
    />
  );
}

export default Video;
