import React from 'react'
import './imagelinkform.css'


const Imagelinkform=({oninputchange,onbuttonsubmit})=>{
    return(
        <div >
            <p className='f3'>
                {'this will give the faces on the picture'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-2'>
                    <input className='f4 pa2 w-69 center' type='text' onChange={oninputchange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onbuttonsubmit}>Detect</button> 
                </div>           
            </div>
        </div>
    )
}
export default Imagelinkform