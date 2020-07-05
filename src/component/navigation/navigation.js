import React from 'react'
const Navigation=({onroutechange,signedin})=>{
    if(signedin){
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
            <p onClick={()=>onroutechange('signout')} 
            className='f3 link dim black pa3 pointer underline'>sign out</p>
            </nav>
        )
    }
        else{
            return(
                <nav style={{display:'flex', justifyContent:'flex-end'}}>
                    <p onClick={()=>onroutechange('signin')} 
                    className='f3 link dim black pa3 pointer underline'>sign in</p>
                    <p onClick={()=>onroutechange('register')} 
                    className='f3 link dim black pa3 pointer underline'>register</p>
                </nav>
            )
        }
    
}
export default Navigation