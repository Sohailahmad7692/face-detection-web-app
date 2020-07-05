import React from 'react'
import './facerecognition.css'


const Facerecognition=({imageurl,box})=>{
    return(
        <div className='center ma mt2'>
            <div className='absolute mt2'>
            <img id='inputimage' alt='' src={imageurl} width='300px' height='auto'></img>
            <div className='boundingbox' style={{top:box.toprow,right:box.rightcol,bottom:box.bottomrow,left:box.leftcol}}></div>
          </div>  
        </div>
    )
}
export default Facerecognition