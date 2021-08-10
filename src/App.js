import React, { Component } from 'react';
import City from './component/City';
// import  Error from './component/Error'
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
      errorMessage: '',
      weather:[]
    }
  }
// https://eu1.locationiq.com/v1/search.php?key=pk.60346fba30221450f0bd55e67928ff53&county=Syria&format=json
// https://eu1.locationiq.com/v1/search.php?key=pk.eaa9c7c720c670657b70074230df20d9=${this.state.cityName}&format=json
// https://eu1.locationiq.com/v1/search.php?key=pk.eaa9c7c720c670657b70074230df20d9&county=amman &format=json
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
        // mapData:mapURL,
        lat:data.lat,
        lon:data.lon ,
        // img:`https://maps.locationiq.com/v3/staticmap?key=pk.eaa9c7c720c670657b70074230df20d9&center=${this.state.lat},${this.state.lon}&zoom=1-18`
      })
    
      this.weatherHandler(this.state.cityName)
    }).catch(error=>{
this.setState({
  errorMessage:`${error}`

})

    })
    
  }

  weatherHandler=(city)=>{
    
    let url=`http://localhost:8000/weather?searchQuery=${city.split(',')[0]}`
    axios.get(url).then(res=>{
      let data= res.data;
      this.setState({
        weather:data,
    
      })
    
    }).catch(error=>{
this.setState({
  errorMessage:`${error}`

})

    })
    
  }
  render() {
    return (
      <div>
  <h1>{this.state.errorMessage} </h1>
        <form onSubmit={(e)=>this.submitHandler(e)}>
          <input type="text" onChange={(e)=>this.getUserInputHandler(e)}
                           placeholder="explore by City name, Street, county..."/>
          <input type="submit" value="explore"/>
        </form>
        <City cityName={this.state.cityName} lat={this.state.lat} lon={this.state.lon} mapData={this.state.img}/>
        <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.eaa9c7c720c670657b70074230df20d9&center=
        ${this.state.lat},${this.state.lon}&zoom=1-18`} alt=''/>
           {this.state.weather && <>  {this.state.weather.map((element)=>{
          return (<Weather data={element.date} description={element.description}/>) 
         })} </> }
      </div>
       
    )
  }
}

export default App