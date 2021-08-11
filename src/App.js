import React, { Component } from 'react';
import City from './component/City';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './component/Weather';

export class App extends Component {
  constructor(props){
    super(props);

    this.state={
      lat:"",
      lon:"",
      cityName:"",
      showText:false,
      errorMessage:'',
      desplyErr: false,
      weather:[]
    }
  }
  getUserInputHandler=(e)=>{
    this.setState({
      cityName:e.target.value
    })
    console.log(this.state.cityName);
  }
  submitHandler=(e)=>{
    e.preventDefault();
    let url=`https://eu1.locationiq.com/v1/search.php?key=pk.eaa9c7c720c670657b70074230df20d9&q=${this.state.cityName}&format=json`
    axios.get(url).then(res=>{
      let data= res.data[0];
      this.setState({
        cityName:data.display_name,
        lat:data.lat,
        lon:data.lon ,
        desplyErr: false,
        errorMessage:'',
        text:true
      })
    
      this.weatherHandler(this.state.cityName)
    }).catch(error=>{
this.setState({
  errorMessage:`${error}`,
  desplyErr: true,
  text:true
})

    }).catch(error=>{
      this.setState({
        errorMessage:`the locatin not found try amman or paris or seaitale`,
        desplyErr: true, text:false})
          })
    
  }

  weatherHandler=(city)=>{
    
    let url=`http://localhost:5555/weather?q=${city.split(',')[0]}`
    axios.get(url).then(res=>{
      let data= res.data;
      this.setState({
        weather:data,
        desplyErr: false,
        errorMessage:'',
        text:true
      })
    
    }).catch(error=>{
this.setState({
  errorMessage:`the weather not found try amman or paris or seaitale`,
  desplyErr: true, text:false})
    })
    
  }
  render() {
    return (
      <div>
   {this.state.desplyErr &&
              <span>{this.state.errorMessage}</span>}
        <form onSubmit={(e)=>this.submitHandler(e)}>
          <input type="text" onChange={(e)=>this.getUserInputHandler(e)}
                           placeholder="explore by City name, Street, county..."/>
          <input type="submit" value="explore"/>
        </form>
          <City  cityName={this.state.cityName} lat={this.state.lat} lon={this.state.lon} mapData={this.state.img}/> 
        <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.eaa9c7c720c670657b70074230df20d9&center=
        ${this.state.lat},${this.state.lon}&zoom=1-18`} alt=''/>
           {this.state.text&&this.state.weather && <>  {this.state.weather.map((element)=>{
          return (<Weather data={element.date} description={element.description}/>) 
         })} </> }
      </div>
       
    )
  }
}

export default App