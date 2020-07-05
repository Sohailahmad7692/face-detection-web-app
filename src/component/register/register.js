import React from 'react'



class  Register extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      name:''
    }
  }
  onnamechange=(event)=>{
    this.setState({name:event.target.value})
  }
  onemailchange=(event)=>{
    this.setState({email:event.target.value})
  }
  onpasswordchange=(event)=>{
    this.setState({password:event.target.value})
  }
  onsubmit=(event)=>{
    fetch('http://localhost:3000/register',{
      method:'post',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({
        email:this.state.email,
        password:this.state.password,
        name:this.state.name
      })
    })
    
    // .then(response=>response.json())
    .then(user=>{
      if(user){
        this.props.loaduser(user)
        console.log('it.s working')
        this.props.onroutechange('home')
      }
    })
    
    // event.preventDefault();

    
    
  }
  render(){ 
    
    return(
      <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
      <main className="pa4 black-80">
<div className="measure ">
  <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
    <legend className="f2 fw6 ph0 mh0">Register</legend>
    <div className="mt3">
      <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
      <input 
      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
      type="name" name="name"  
      id="name"
      onChange={this.onnamechange}
      />
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
    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value=" Register"/>
  </div>
  
</div>
</main>
</article>
  )
  }  
  
}
export default Register