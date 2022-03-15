import React from 'react'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHome, faListUl, faUserCog } from '@fortawesome/free-solid-svg-icons';

function FixedFooter({ defaultTemplate, children, bottomChild, style, className, bottomClass }) {
  return (
    <nav id="bottomNav" className={`footer ${className}`} style={style}>
      {children}
      {defaultTemplate &&
        <div className={`links searchFilterContent ${bottomClass}`}>
          <NavLink className="footerLink" to='/home' style={({ isActive }) => isActive ? { color: 'var(--blue)' } : {}}>
            <span>
              <span className="footerIcon"><FontAwesomeIcon icon={faHome} /></span>
              <p>Home</p>
            </span>
          </NavLink>

          <NavLink className="footerLink" to='/history' style={({ isActive }) => isActive ? { color: 'var(--blue)' } : {}}>
            <span>
              <span className="footerIcon"><FontAwesomeIcon icon={faListUl} /></span>
              <p>History</p>
            </span>
          </NavLink>

          <NavLink className="footerLink" to='/chat' style={({ isActive }) => isActive ? { color: 'var(--blue)' } : {}}>
            <span>
              <span className="footerIcon cart">
                <FontAwesomeIcon icon={faCommentDots} />
              </span>
              <p>Chat</p>
            </span>
          </NavLink>

          <NavLink className="footerLink" to='/account' style={({ isActive }) => isActive ? { color: 'var(--blue)' } : {}}>
            <span>
              <span className="footerIcon"><FontAwesomeIcon icon={faUserCog} /></span>
              <p>Account</p>
            </span>
          </NavLink>
        </div>
      }
      {bottomChild}
    </nav>
  )
}

export default FixedFooter;