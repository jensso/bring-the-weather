import React from 'react';
import './App.css';
const axios = require('axios');

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citys: [],
      input: '',
      weatherArr: [],
      error: ''
    }
  }
  handleInput(ev) {
    this.setState({input: ev.target.value,
                    citys: ev.target.value.split('-'),
                  });
  }
  handleSubmit(ev) {
    ev.preventDefault();
    const openWeatherKey = 'e6bcda912d208337919146e129b426ad';
    for (let i = 0; i < this.state.citys.length; i++) {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.citys[i]}&APPID=${openWeatherKey}`;
     axios.get(url)
    .then(res=> Promise.resolve(res) )
    .then(obj=> this.state.weatherArr.push(obj) )
    .then(arr=> this.setState({weatherArr: this.state.weatherArr}))
    .catch(err=> this.setState({error: err.response.status+' '+err.response.statusText}));
    }
    this.setState({input: '',
                  citys: [],
                  error: ''
                  });
                  console.log(this.state.weatherArr);
}

  render() {
    return (
      <div className="App">
        <h1>check weather around the globe</h1>
        <div id="weatherForm">
          <form id="form" onSubmit={this.handleSubmit.bind(this)}>
            <input onChange={this.handleInput.bind(this)} value={this.state.input} type="text" placeholder="enter city for weathercheck (seperate multiples by '-')"></input>
            <button id="weatherBtn">bring the weather</button>
          </form>
          {this.state.error && <p id="err"><b>{this.state.error}</b> <i>An error occured. Please try again</i></p>}
        </div>
        <div id="container">
         {this.state.weatherArr.map((city, index)=>
           <section key={index}>
            <h3>{city.data.name}</h3>
            <p>{city.data.weather[0].description}</p>
            <img src={`http://openweathermap.org/img/w/${city.data.weather[0].icon}.png`} alt="icon"></img>
            <p>{Math.round((city.data.main.temp-273.15))} °C</p>
            <p>Wind speed {city.data.wind.speed} mph</p>
          </section>
        )
      }
        </div>
      </div>
    );
  }
}

// <h3>{city['.data.name']}</h3>
// <p>{city['.data.weather[0].description']}</p>
// <p>{Math.round((city['.data.main.temp'-273.15]))} °C</p>
// <img src={`http://openweathermap.org/img/w/${city['.data.weather[0].icon']}.png`} alt="icon"></img>
