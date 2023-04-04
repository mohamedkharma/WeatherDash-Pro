import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import WeatherChart from "./weatherChart";
const API_KEY = import.meta.env.VITE_APP_API_KEY;


const WeatherDetail = () => {
  let params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getWeatherHist = async () => {
    const response = await fetch(`https://api.weatherbit.io/v2.0/history/daily?city=NYC&start_date=${params.date}&end_date=${getNextDay(params.date)}&key=${API_KEY}`)
    const json = await response.json()
    setFullDetails(json);
    }
    getWeatherHist().catch(console.error);
  },[])

  const getNextDay = (date) => {
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      return nextDate.toISOString().slice(0, 10);
      };
  
  return (
    <div>
      { fullDetails ? (
        <div className="weatherDetails">
          <h1>{fullDetails.city_name}</h1>
          <h2>Date: {fullDetails.data[0].datetime}</h2>
          <h3>State: {fullDetails.state_code}, Country: {fullDetails.country_code}</h3>
          <div className="table2">
            <table>
              <tbody>
                <tr>
                  <th>Latitude</th>
                  <td>{fullDetails.lat}</td>
                </tr>
                <tr>
                  <th>Longitude</th>
                  <td>{fullDetails.lon}</td>
                </tr>
                <tr>
                  <th>Accumulated Snowfall</th>
                  <td>{fullDetails.data[0].snow} mm</td>
                </tr>
                <tr>
                  <th>Maximum temperature </th>
                  <td>{fullDetails.data[0].max_temp} °C</td>
                </tr>
                <tr>
                  <th>Minimum temperature</th>
                  <td>{fullDetails.data[0].min_temp} °C</td>
                </tr>
                <tr>
                  <th>Average temperature</th>
                  <td>{fullDetails.data[0].temp} °C</td>
                </tr>
                <tr>
                  <th>Average pressure</th>
                  <td>{fullDetails.data[0].pres} mb</td>
                </tr>
                <tr>
                  <th>Average cloud coverage</th>
                  <td>{fullDetails.data[0].clouds} %</td>
                </tr>
                <tr>
                  <th>Average wind speed</th>
                  <td>{fullDetails.data[0].wind_spd} m/s</td>
                </tr>
                <tr>
                  <th> Average relative humidity</th>
                  <td>{fullDetails.data[0].rh} %</td>
                </tr>
                <tr>
                  <th>Average solar radiation</th>
                  <td>{fullDetails.data[0].solar_rad} W/M^2</td>
                </tr>
                <tr>
                  <th>Average dew point</th>
                  <td>{fullDetails.data[0].dewpt} °C</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      ) : null }
    </div>
  );
};

export default WeatherDetail;