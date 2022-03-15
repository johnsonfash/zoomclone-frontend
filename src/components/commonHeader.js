import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
import React, { } from 'react'

function CommonHeader({ heading, className, child, style, inlineChild, inlineChildClass, centerText }) {
  let router = useNavigate();

  return (
    <>
      <div className='headBarContainer'>
        <div className={`headBar ${className}`} style={{ ...style, overflow: 'hidden' }}>
          <div style={{ display: 'flex', width: '100%' }}>
            <span onClick={() => router(-1)} style={{ cursor: 'pointer', marginRight: '0.2em', fontSize: '1.2em' }}><FontAwesomeIcon icon={faArrowLeft} /></span>
            {heading && <div className={`storesHeader ${centerText && 'header'}`}>
              {heading}
            </div>}
            <div className={inlineChildClass}>
              {inlineChild}
            </div>
          </div>
          {child}
        </div>
      </div>
    </>
  )
}

export default CommonHeader
