import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import "./SearchBox.css";

export default function SearchBox({updateInfo}){
    let [city , setCity] = React.useState("");
    let [error,setError] = React.useState(false);
    const API_URL ="https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "04b0dcffc5fa2f76366685793d94eef5";

    let getWeatherInfo = async () => {
        try{
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse =  await response.json();
            let result ={
                city:city,
                temp : jsonResponse.main.temp,
                tempMin :  jsonResponse.main.temp_min,
                tempMax :  jsonResponse.main.temp_max,
                humidity : jsonResponse.main.humidity,
                feelsLike : jsonResponse.main.feels_like,
                weather : jsonResponse.weather[0].description,  
            };
            console.log(result);
            return result;
        }catch(err){
            throw err;
        }
        
    }


    
    let handleChange = (event) =>{
        setCity(event.target.value);
    };
    let handleSubmit = async(event) =>{
        try{
            event.preventDefault();
            console.log(city);
            setCity('');
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        }catch(err){
            setError(true);
        }
      
    };
    return (
        <div className='search'>
            <h3>Search for the weather</h3>
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="standard" onChange={handleChange} required value={city}/><br /><br />
            <Button variant="contained" endIcon={<SendIcon />} type="submit">Search</Button>
            {error && <p style={{color:"red"}}>No such place Exits</p>}
            </form>
        </div>
    )
}
