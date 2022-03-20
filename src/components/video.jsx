import React, { useEffect } from "react";
import { useRef } from "react";

function Video({ id, stream }) {
  const ref = useRef();
  useEffect(() => {
    setTimeout(() => {
      ref.current.srcObject = stream;
    }, 300);
  }, [stream]);

  return (
    <div>
      <video
        controls={false}
        playsInline={true}
        muted={false}
        autoPlay={true}
        ref={ref}
        id={id}
      />
    </div>
  );
}

export default Video;
