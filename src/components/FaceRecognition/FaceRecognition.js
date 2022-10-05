import React from 'react';
import './FaceRecognition.css';

// Component that utilizes the Clarifai API to detect faces in images
const FaceRecognition = ({ box, imageUrl }) => {

    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' src={imageUrl} alt="Clarifai" width="500px" height="auto" />
                <div className='bounding-box' style={{ top: box.top, right: box.right, bottom: box.bottom, left: box.left }}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;