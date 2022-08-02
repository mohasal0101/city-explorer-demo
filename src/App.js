import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Map from './map';
import Weather from './weather.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      allCity: {},
      display_name: '',
      latitude: '',
      longitude: '',
      errorMessage: '',
      displayError: false
    }
  }

  getCityName = async (e) => {
    e.preventDefault();

    try {

      const cityData = await axios.get(`https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITY_KEY}&q=${e.target.userCityInput.value}&format=json`)


      console.log(e.target.userCityInput.value);
      // console.log(cityData.data);

      this.setState({
        userInput: e.target.userCityInput.value,
        allCity: cityData.data[0],
        display_name: cityData.data[0].display_name,
        latitude: cityData.data[0].lat,
        longitude: cityData.data[0].lon,
        displayError: false

      });

    } catch (error) {

      this.setState({
        displayError: true,
        errorMessage: error.response.status + ' : ' + error.response.data.error,
        display_name: ''

      })
    }
  }



  render() {
    return (
      <div className="App">
        <h1> {process.env.REACT_APP_TITLE}</h1>
        <Form onSubmit={this.getCityName}>
          <Form.Label htmlFor="text" id='userCityInput' >Enter City Name </Form.Label>
          <Form.Control type="text" id="userCityInput" />
          <Button variant="primary" type="submit">Explore! </Button>
        </Form>

        {this.state.displayError &&
          <>
            
              <h1>{this.state.errorMessage}</h1>
              <p> The city you entered cannot be found, please check your spelling or try a different city! </p>
            
            
          </>
        }

        {this.state.display_name &&
          <>
            <p>City Name: {this.state.display_name}</p>
            <p>City latitude: {this.state.latitude} </p>
            <p>City longitude: {this.state.longitude}</p>

            <Map
              map_src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.latitude},${this.state.longitude}&zoom=10`}
              city={this.state.display_name}
            />
            <Weather />
          </>
        }


      </div>
    );
  }
}

export default App;