import React from 'react'



class Signin extends React.Component{
  constructor(props){
    super(props);
    this.state={
      signedinemail:'',
      signedinpassword:''
    }
  }
  onemailchange=(event)=>{
    this.setState({signedinemail:event.target.value})
  }
  onpasswordchange=(event)=>{
    this.setState({signedinpassword:event.target.value})
  }
  onsubmit=(event)=>{
    fetch('http://localhost:3000/signin',{
      method:'post',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({
        email:this.state.signedinemail,
        password:this.state.signedinpassword
      })
    })
    
    .then(response=>response.json())
    .then(user=>{
      if(user.id){
        this.props.onroutechange('home')
        this.props.loaduser(user);
        
      }
    })
    
    // event.preventDefault();

    
    
  }
  render(){
    const {onroutechange}=this.props;
    return(
      <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
      <main className="pa4 black-80">
<div className="measure ">
  <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
    <legend className="f2 fw6 ph0 mh0">Sign In</legend>
    <div className="mt3">
      <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
      <input 
      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
      type="email" 
      name="email-address"  
      id="email-address"
      onChange={this.onemailchange}
      />
    </div>
    <div className="mv3">
      <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
      <input 
      className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
      type="password" 
      name="password"  
      id="password"
      onChange={this.onpasswordchange}
      />
    </div>
  </fieldset>
  <div className="">
    <input
    onClick={this.onsubmit}
    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
  </div>
  <div className="lh-copy mt3">
    <p onClick={()=>onroutechange('register')} class="f6 link dim black db">Register</p>
  </div>
</div>
</main>
</article>
  )
  }
    
}
export default Signin