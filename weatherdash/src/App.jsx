import { useState, useEffect } from 'react'
import ItemsList from './Components/itemsList';
import WeatherChart from './Components/weatherChart';
import './App.css'

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const  [inputs, setInputs] = useState({
    startDate: "2023-03-27",
    endDate: "2023-04-03"
    });

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // const [cloudCoverage, setCloudCoverage] = useState('');
  // const [windSpeed, SetwindSpeed] = useState('');


  // const [states, setStates] = useState([]);
  // const [searchState, setSearchState] = useState("");

  // useEffect(() => {
  //   // declare the async data fetching function
  //   const fetchData = async() => {
  //     const response = await fetch(
  //       `https://api.weatherbit.io/v2.0/states?country=US&key=${API_KEY}`
  //     );
  //     const json = await response.json();
  //     setStates(json.data);
  //   }
  //   // catch errors
  //   fetchData().catch(console.error);
  // }, []);


  useEffect(() => {
    // declare the async data fetching function
    const fetchWeatherData = async() => {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?&city=NY&country=US&units=I&key=${API_KEY}`
      )
      const json = await response.json();
      setCurrentWeather(json.data[0]);
      }
    // catch errors
    fetchWeatherData().catch(console.error);
  }, [])


  
  // const handleStateCodeChange = (event) => {
  //   setSearchState(event.target.value);
  // }
  function getDate7DaysAgo() {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    return sevenDaysAgo.toISOString().slice(0, 10);
  }
  
  const handleSearch = (event) => {
    console.log(startDate, endDate, cloudCoverage);
    setInputs({
      ...inputs,
      startDate: startDate,
      endDate: endDate,
      windSpeed: windSpeed,
      cloudCoverage: cloudCoverage
    });
  }


  const handleChange = (event) => {
    const {name, value} = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="App">
      <div className="App-sidebar">
        <div className="Header">
          <img className="Logo" alt="weather logo" src="https://img.icons8.com/fluency/256/sky.png"></img>
          <h3 className="Header-title">WeatherDash</h3>
        </div>
        <div className="Menu">
          <ul>
            <li className="Menu-item">
              <a className="menu-link" href="">Dashboard</a>
            </li>
            <li className="Menu-item">
              <a className="menu-link" href="">Search</a>
            </li>
            <li className="Menu-item">
              <a className="menu-link" href="">About</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="App-page">
        <div className="App-row">
          <div className='Card'>
            <h2>{"🗽" + currentWeather.city_name}</h2>
            <h2>{"🕒 Time: " + currentWeather.ob_time}</h2>
          </div>
          <div className='Card'>
            <h2>{"🌅 Sunrise: " + currentWeather.sunrise + " am"}</h2>
            <h2>{"🌌 Sunset: " + currentWeather.sunset + " pm"}</h2>
          </div>
          <div className='Card'>
            <h2>{"🌡 Temp: " + currentWeather.temp + " °F"}</h2>
            {/* <h2>{"🌍 Status: " + currentWeather.weather.description}</h2> */}
          </div>
        </div>
        <div className="App-row">
          <div className='List'>
            <div className='filters'>
              <div className='dateFilter'>
                <label className='date1'>From Date: </label>
                {/* <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button> */}
                {/* <input type="text" placeholder="Enter State Code" value={searchState} onChange={handleStateCodeChange} /> */}
                <input
                  type="text"
                  placeholder="YYYY-MM-DD"
                  name='startDate'
                  onChange={(e) => setStartDate(e.target.value)}

                />
                <label className='date2'>To Date: </label>
                <input
                  type="text"
                  placeholder="YYYY-MM-DD"
                  name='endDate'
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className='sliderFilters'>
                <label className='slider1'>Cloud Coverage ☁️: </label>
                <input className='range'
                  type="range"
                  min="0" 
                  max="100"
                  name='cloudCoverage'
                  // onChange={(e) => setCloudCoverage(e.target.value)}
                  onChange={handleChange}
                />

                <label className='slider1'>Wind Speed 🍃: </label>
                <input className='range'
                  type="range"
                  min="0" 
                  max="100"
                  name='windSpeed'
                  // onChange={(e) => setCloudCoverage(e.target.value)}
                  onChange={handleChange}
                />

              </div>
              <button onClick={handleSearch}>Search</button>
            </div>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Temperature(°F)</th>
                    <th>Humidity(%)</th>
                    <th>Wind Speed(m/s)</th>
                    <th>Cloud Coverage(%)</th>
                  </tr>
                </thead>
              </table>
              <ItemsList 
                inputs={inputs}
              />
              <WeatherChart
                inputs={inputs}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
