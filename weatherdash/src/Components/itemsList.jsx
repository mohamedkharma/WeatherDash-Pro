import { useState, useEffect } from 'react'
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import { Link } from "react-router-dom";


const ItemsList = ({inputs}) => {
    const [weatherData, setWeatherData] = useState([{}]);
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

        !inputs.windSpeed ? setWeatherData(data) : setWeatherData(filterData); 
    }
    return (
        <table className="data-table">
            <tbody>
                { inputs && weatherData.map((date, index) => 
                    <tr key={index}>
                        <td>{date.datetime}</td>
                        <td>{date.temp + "°F"}</td>
                        <td>{date.rh + "%"}</td>
                        <td>{date.wind_spd + " m/s"}</td>
                        <td>{date.clouds + "%"}</td>
                        <td><Link to={`/weatherDetail/${date.datetime}`}>View Details</Link></td>
                    </tr>
                ) 
                }
            </tbody>
        </table>

        
    )

};

export default ItemsList;