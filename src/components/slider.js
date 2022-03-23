import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import Video from "./video";


function Slider({ item, actv, clickedImage, className, imageStructureClass, imageClass, style, onChange, absolutePath, nameStyle, structureStyle, imageStyle, imageContainerClass, textCut, dynamicColor, imageContainerStyle, textClass, textStyle, nameClass }) {
  const [state, setstate] = useState([]);
  const [activity, setActivity] = useState([]);
  const [select, setSelect] = useState('');

  useEffect(() => {
    setstate(item)
  }, [item]);

  useEffect(() => {
    setActivity(actv)
  }, [actv]);


  return (
    <div className={`overflowSlider ${className}`} style={style}>
      {state && state.map((data, idx) => (
        <div key={idx}
          className='slideImage'
          title="CLICK TO VIEW ON MAIN SCREEN"
          id={data.id} onClick={() => clickedImage({ id: data.id, stream: data.stream, peer: data.peer, name: data.name, image: data.image })}>
          <div id={data.id} className={`${imageContainerClass}  ${select === data.id && "active"}`} style={{ display: "inline-flex", flexDirection: 'column', justifyContent: 'space-between', cursor: "pointer", ...imageContainerStyle }}>
            <span className={imageStructureClass} id={data.id} style={structureStyle}>
              <span className="videoDot active">{activity.find(e => e?.id === data.id)?.video ? '•' : ''}</span>
              <span className={imageClass} style={{ ...imageStyle, display: "inline-block", overflow: "hidden" }}>
                {
                  !data.stream ?
                    <img id={data.id} alt="" src={data.image} /> :
                    <Video id={data.id} stream={data.stream} />
                }
              </span>
              {
                activity.find(e => e?.id === data.id)?.audio ?
                  <span className="audioIcon">
                    <FontAwesomeIcon icon={faMicrophone} />
                  </span>
                  :
                  <span className="audioIcon">
                    <FontAwesomeIcon icon={faMicrophoneSlash} />
                  </span>
              }
            </span>
          </div>
          {data.name && <h6 id={data.name} className={nameClass} style={nameStyle}> {data.name} </h6>}
        </div>
      ))}
    </div>
  )
}

export default Slider
