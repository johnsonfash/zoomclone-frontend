import React, { useEffect } from 'react'

function FixedHead({ children, desktopChild, style, marginUnder, className, nextChild, mainChildStyle, fixedLastChild }) {

  return (
    <>
      <nav id="headNav" className={`head ${className}`} style={style}>
        {desktopChild}
        <div>
          <div style={mainChildStyle}>{children}</div>
          {nextChild}
          {fixedLastChild && <div className='fixedLastChild' style={{ top: `var(--marginTopSearch)` }}>{fixedLastChild}</div>}
        </div>
      </nav>
      <div style={{ marginTop: marginUnder }}></div>
    </>
  )
}

export default FixedHead;