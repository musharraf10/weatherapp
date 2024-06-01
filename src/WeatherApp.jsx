import { useState } from 'react'
import InfoBox from './InfoBox'
import SearchBox from './SearchBox'

export default function WeatherApp(){
    const [weatherInfo,setWeatherInfo] = useState({
        city:"Guntur",
        feelsLike: "40.78",
        humidity: "25",
        temp: "39.82",
        tempMax: "39.82",
        tempMin: "37.94",
        weather:  "overcast clouds"
    });

    let updateInfo = (newInfo) =>{
        setWeatherInfo(newInfo);
    }
    return (
        <div style={{textAlign:"center"}}>
            <h3>Weather App</h3>
            <SearchBox updateInfo={updateInfo}/><br />
            <InfoBox info={weatherInfo}/>
        </div>
    )
}