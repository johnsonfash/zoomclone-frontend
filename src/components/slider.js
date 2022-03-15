import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import Video from "./video";


function Slider({ item, className, imageStructureClass, imageClass, style, onChange, absolutePath, nameStyle, structureStyle, imageStyle, imageContainerClass, textCut, dynamicColor, imageContainerStyle, textClass, textStyle, nameClass }) {
  const [state, setstate] = useState([]);
  const [select, setSelect] = useState('');

  useEffect(() => {
    setstate(item)
  }, [item]);

  const clickedImage = (e) => {
    let val = e.target.id;
    setSelect(val)
    onChange && onChange(val);
  }

  return (
    <div className={`overflowSlider ${className}`} style={style}>
      {state && state.map((data, idx) => (
        <div key={idx}
          className='slideImage'
          id={data.id} onClick={clickedImage}>
          <div id={data.id} className={`${imageContainerClass}  ${select === data.id && "active"}`} style={{ display: "inline-flex", flexDirection: 'column', justifyContent: 'space-between', cursor: "pointer", ...imageContainerStyle }}>
            <span className={imageStructureClass} id={data.id} style={structureStyle}>
              <span className="videoDot active">•</span>
              <span className={imageClass} style={{ ...imageStyle, display: "inline-block", overflow: "hidden" }}>
                {
                  data.image ?
                    <img id={data.id} alt="" src={data.image} /> :
                    <Video id={data.id} stream={data.stream} />
                }
              </span>
              <span className="audioIcon">
                <FontAwesomeIcon icon={faMicrophoneSlash} />
              </span>
            </span>
          </div>
          {data.name && <h6 id={data.name} className={nameClass} style={nameStyle}> {data.name} </h6>}
        </div>
      ))}
    </div>
  )
}

export default Slider
