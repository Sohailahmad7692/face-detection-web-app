import React, { Component } from 'react';
import './App.css';
import Navigation from './component/navigation/navigation'
import Imagelinkform from './component/imagelinkform/imagelinkform'
import Signin from './component/signin/signin'
import Register from './component/register/register'
import Logo from './component/logo/logo'
import Rank from './component/rank/rank'
import Clarifai from 'clarifai'
import Facerecognition from './component/facerecognition/facerecognition'
import Particles from 'react-particles-js';
const app = new Clarifai.App({
  apiKey: '9f3a6465f7ce415ca3d95ee427210d81'
  
 });
 const initialstate={
  input:'',
  imageurl:'',
  box:{},
  route:'signin',
  signedin:false,
  user:{
    id:"",
    name:"",
    email:"",
    password:"",
    entry:0,
    joined:new Date()
 }
}
class App extends Component {
  constructor(){
    super();
    this.state=initialstate;
  }
  loaduser=(data)=>{
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        password:data.password,
        entry:data.entry,
        joined:data.joined
    }})
  }
  onroutechange=(route)=>{
    if(route==='home'){
      this.setState({signedin:true})
    }
    else if(route==='signout'){
      this.setState(initialstate)
    }
    this.setState({route:route})
  }
  
  calculatefaceloaction=(data)=>{
    const clarifaiface=data.outputs[0].data.regions[0].region_info.bounding_box
    const image=document.getElementById('inputimage')
    const width=Number(image.width);
    const height=Number(image.height);
    console.log(width,height)
    return{
      leftcol:clarifaiface.left_col*width,
      toprow:clarifaiface.top_row*height,
      rightcol:width-clarifaiface.right_col*width,
      bottomrow:height-clarifaiface.bottom_row*height,
    }

  }
  displayfacebox=(box)=>{
    this.setState({box:box})
    console.log(box)
  }
  oninputchange=(event)=>{
    this.setState({input: event.target.value});
  }
  onbuttonsubmit=()=>{
    this.setState({imageurl:this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response =>{
      if(response){
        fetch('http://localhost:3000/image',{
          method:'put',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({
          id:this.state.user.id
      })
        })
        .then(response=>response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entry:count}))
        })
      }
      this.displayfacebox(this.calculatefaceloaction(response))
    })
    .catch(err=>console.log(err));
  }
  render(){
  return (
    <div className="App">
      
      <Particles className='particle' 
      />
      
      <Navigation signedin={this.state.signedin} onroutechange={this.onroutechange}/>
      { this.state.route==='home'
        ?<div>
        <Logo/>
        <Rank name= {this.state.user.name} entry={this.state.user.entry}/>/>
        <Imagelinkform 
        oninputchange={this.oninputchange}
        onbuttonsubmit={this.onbuttonsubmit}
        />
        <Facerecognition box={this.state.box} imageurl={this.state.imageurl}/>
      </div>
      :(
        this.state.route==='signin'
        ?<Signin loaduser={this.loaduser} onroutechange={this.onroutechange}/>
        :<Register loaduser={this.loaduser} onroutechange={this.onroutechange}/>
        )
      }
      
    </div>
  );
}}

export default App;
