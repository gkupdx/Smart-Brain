// Logo component
import React from 'react';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            {/* <Tilt className='Tilt br2 shadow-2' options={{ max: 55 }} style={{ height: 150, width: 150 }}> */}
            <div className='pa3'>
                <img className='bg-gradient' style={{ padding: '20px'}} src={brain} alt="Brain outline" />
            </div>
        </div>
    )
}

export default Logo;