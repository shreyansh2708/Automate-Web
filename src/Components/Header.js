import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.css"
function Header() {
  return (
    <div className='top-container'>
        <span className='name'>Automate Web!</span>
        <Link className='link-style' to="/">
          <span className='home'>Home</span>
        </Link>
    </div>
  )
}

export default Header