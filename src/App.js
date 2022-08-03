import { Component } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import axios from 'axios';
import DisplayedInformation from './components/DisplayedInformation';
import Map from './components/Map';
import ErrorComp from './components/ErrorComp';
import Weather from './components/weather';
import Movie from './components/Movie';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: '',
      latitude: '',
      longitude: '',
      map_src: '',
      displayInfo: false,
      errorMsg: '',
      displayErr: false,
      weather: [],
      isWeather: false,
      movies: [],
      isMovie: false
    }
  }

  displayLocation = async (e) => {
    e.preventDefault();
    const searchQuery = e.target.searchQuery.value;

    const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${searchQuery}&format=json`;

    // console.log(url)
    try {
      const city = await axios.get(url)
      // console.log(city)
      this.setState({
        display_name: city.data[0].display_name,
        latitude: city.data[0].lat,
        longitude: city.data[0].lon,
        displayInfo: true,
        displayErr: false
      })
  
      this.displayMap(city.data[0].lat, city.data[0].lon);
      this.displayWeather(searchQuery, city.data[0].lat, city.data[0].lon);
      this.fetchMovies(searchQuery);

    } catch(error) {
      console.log(error)
      this.setState({
        displayInfo: false,
        displayErr: true,
        errorMsg: error.response.status + ': ' + error.response.data.error
      })
    }
  }

  displayMap = (lat, lon) => {
    const mapSrc = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${lat},${lon}&zoom=18`;
    console.log(mapSrc)
    this.setState({
      map_src: mapSrc
    })
  }

  displayWeather = async (searchQuery, lat, lon) => {
    try {
      const weatherData = await axios.get(`https://city-explor-api.herokuapp.com/weather?searchQuery=${searchQuery}&lat=${lat}&lon=${lon}`);
      this.setState({
        isWeather: true,
        weather: weatherData.data
      })
    } catch (error) {
      this.setState({
        errorMsg: error.response.status + ': ' + error.response.data.error,
        displayErr: true,
        isWeather: false,
        displayInfo: false
      })
    }

  }

  fetchMovies = async (searchQuery) => {
    try {
      const movieData = await axios.get(`https://city-explor-api.herokuapp.com/movies?searchQuery=${searchQuery}`);
      this.setState({
        movies: movieData.data,
        isMovie: true
      })
    } catch(error) {
      this.setState({
        isMovie: false
      })
    }
  }

  render() {
    return (
      <div className="App">
        <SearchForm submitHandler={this.displayLocation}/>
        {this.state.displayInfo && 
          <>
            <DisplayedInformation cityInfo={this.state}/>
            <Map mapSource={this.state.map_src}/>
          </>
        }

        {this.state.isWeather && 
          <Weather weatherInformation={this.state.weather}/>
        }

        {this.state.isMovie && 
          <Movie movie={this.state.movies}/>

        }

        {this.state.displayErr && 
          <ErrorComp error={this.state.errorMsg} />
        }
      </div>
    );
  }
}

export default App;