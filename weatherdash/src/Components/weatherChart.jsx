import React, { Component, PureComponent, useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;


import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const WeatherChart = ({inputs}) => {
  const [histData, setHistData] = useState(null);

  useEffect(() => {
    const getWeatherHist = async () => {
    const response = await fetch(`https://api.weatherbit.io/v2.0/history/daily?city=NYC&start_date=${inputs.startDate}&end_date=${inputs.endDate}&units=I&key=${API_KEY}`)
    const json = await response.json()
    setData(json.data);
    }
    getWeatherHist().catch(console.error);
  },[inputs])

  const setData = (data) => {
    const filterData = data.filter((item) => { 
        return (
        item.wind_spd <= inputs.windSpeed &&
        (inputs.cloudCoverage === null || item.clouds <= inputs.cloudCoverage)
        );
    });

    !inputs.windSpeed ? setHistData(data) : setHistData(filterData); 
}

  return (
      <div>
        <div className="cloudChart">
          <div style={{ margin: '50px' }}>
          <h2 style={{ textAlign: 'center' }}>7-Days Cloud Chart</h2>
            <BarChart width={800} height={400} data={histData} 
                margin={{
                    top: 7,
                    right: 50,
                    left: 50,
                    bottom: 7,
                }}
            >
                <Bar dataKey="clouds" fill="darkgray" />
                <CartesianGrid strokeDasharray="5 5" />
                <Legend />
                <XAxis dataKey="datetime" tickMargin={7} />
                <YAxis unit='%' tickMargin={7}/>
                <Tooltip />
            </BarChart>
          </div>
        </div>

        <div className="TempChart">
          <div style={{ margin: '50px' }}>
          <h2 style={{ textAlign: 'center' }}>7-Days Temperature Chart</h2>
          <LineChart width={800} height={400} data={histData} margin={{
                  top: 7,
                  right: 50,
                  left: 50,
                  bottom: 7,
              }}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="datetime" />
            <YAxis unit="°F" />
            <Tooltip />
            <Line type="monotone" name="Max Temperature" dataKey="max_temp" stroke="#8884d8" strokeWidth={2} dot={false} />
            <Line type="monotone" name="Average Temperature" dataKey="temp" stroke="#f90" strokeWidth={2} dot={false} />
            <Line type="monotone" name="Min Temperature" dataKey="min_temp" stroke="#82ca9d" strokeWidth={2} dot={false} />
          </LineChart>
          </div>
        </div>
      </div>
  );
};

export default WeatherChart;