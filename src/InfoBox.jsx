import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export default function InfoBox({info}){
   const init_img ="https://plus.unsplash.com/premium_photo-1673984261110-d1d931e062c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOXx8fGVufDB8fHx8fA%3D%3D";
   const HOT_URL = "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VtbWVyfGVufDB8fDB8fHww";
   const COLD_URL ="https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
   const RAIN_URL = "https://media.istockphoto.com/id/1215630075/photo/rain-drop-falling-closeup.jpg?s=612x612&w=0&k=20&c=GW46k5ZobyVP49DhaoSvvPj1KjH0-NiPM5sOB09s11Y=";
    return (
        <div className="weatherInfo">
    <Card sx={{ maxWidth: 345 }} className='card'>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={info.humidity >80 ? RAIN_URL :(info.temp >29) ? HOT_URL : COLD_URL }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {info.city} &nbsp;{info.humidity >80 ? <ThunderstormIcon/> :(info.temp >29) ? <WbSunnyIcon/> : <AcUnitIcon/>}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="span">
          <div>Temperature : {info.temp}&deg;C </div>
          <div>Humidity : {info.humidity} </div>
          <div>Feels like : {info.feelsLike}&deg;C </div>
          <div>Max Temperature : {info.tempMax}&deg;C</div>
          <div>Min Temperature : {info.tempMin}&deg;C</div>
          <div>Weather Condition : {info.weather}</div>
        </Typography>
      </CardContent>
    </Card>
        </div>
    )
}