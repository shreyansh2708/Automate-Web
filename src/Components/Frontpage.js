import React from 'react'
import "./Frontpage.css"
import { Link } from 'react-router-dom'
function Frontpage() {
  return (
    <div className='front'>
        <div className='components'>
            <Link className='link-style'to="/image-to-text">
                <div className='grid-item'>
                    <p className='text'>Image to Text</p>
                    <p className='extract-text'>Extracts Text from Image</p>
                </div>
            </Link>

            <Link className='link-style' to="/speech-to-text">
                <div className='grid-item'>
                    <p className='text'>Speech Recognition</p>
                    <p className='extract-text'>Speech to Text</p>
                </div>
            </Link>

            <Link className='link-style' to="/translation">
                <div className='grid-item'>
                    <p className='text'>Language Translation</p>
                    <p className='extract-text'>Translate Text to Another Language</p>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Frontpage