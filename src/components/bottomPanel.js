import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'


let contentHight = 0;
function BottomPanel({ children, openTab, onClick }) {
  const [state, setstate] = useState(['0px', 'none']);
  const ht = useRef(null);

  useEffect(() => {
    contentHight = ht.current.offsetHeight;
  });

  useEffect(() => {
    if (openTab) {
      setstate([contentHight, 'block']);
    } else {
      setstate(['0px', 'none']);
    }
  }, [openTab]);

  return (
    <div className="bottomPanelContainer" style={{ height: state[0] }}>
      <div className="searchFilterOverLay" style={{ display: state[1] }} onClick={() => onClick()}></div>
      <div ref={ht} className="bottomPanel searchFilterContent">
        <span className="cancelPanel pointer" onClick={() => onClick()}><FontAwesomeIcon icon={faTimes} /></span>
        {children}
      </div>
    </div>
  )
}

export default BottomPanel
