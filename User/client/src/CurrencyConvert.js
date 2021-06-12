import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './other.css'
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import { useSpeechContext } from '@speechly/react-client';
import Landing from './Landing'
require('dotenv').config();

function CurrencyConvert(props) {

    const { REACT_APP_WEATHER_API_KEY }=process.env;

    const { segment } = useSpeechContext();

    var loc='India';
    var location='India';
    var CurConUrl=`http://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=41c6b5c1dc1537b062654992c1950485`;

    const[place, setPlace]=useState([]);
    const [temperature, setTemperature]=useState();
    const[minTemp, setMinTemp]=useState();
    const[maxTemp, setMaxTemp]=useState();
    const[pressure, setPressure]=useState();
    const[windSpeed, setWindSpeed]=useState();
    const[weatherType, setType]=useState();
    const[humid, setHumid]=useState();

    const fetchConverted = async () =>{

        const response=await fetch(CurConUrl);
        const place=await response.json();
        setPlace(place);
        setTemperature(place.main.temp);
        setMaxTemp(place.main.temp_max);
        setMinTemp(place.main.temp_min);
        setPressure(place.main.pressure);
        setWindSpeed(place.wind.speed)
        setType(place.weather[0].main)
        setHumid(place.main.humidity);

    }

    useEffect(() =>{
        fetchConverted();
    },[]);

    useEffect(() =>{
        if(segment){
            if(segment.intent.intent === 'weather_for'){
                segment.entities.forEach((e) => {
                    switch(e.type){
                        case 'place':

                            document.getElementById("location").value=e.value;
                            const loc=document.getElementById("location").value;
                            // setTimeout(changePlace(loc), 5000);
                            changePlace(String(loc));
                            break;
                        default:
                            break;
                    }
                })

            }
            else if(segment.intent.intent === 'move_to'){

                segment.entities.forEach((e) => {
                    switch(e.value){
                        case 'BACK':
                            window.location.href = "http://localhost:3000";
                            break;
                        case 'COUNTRIES':
                            window.location.href = "http://localhost:3000/countries";
                            break;
                        case 'TRAVEL':
                            window.location.href = "http://localhost:3000/travel";
                            break;
                        case 'WEATHER':
                            window.location.href = "http://localhost:3000/weather";
                            break;
                        default:
                            break;
                    }
                })

            }
        }
    },[segment]);

    const changePlace = async (location) =>{
        loc=location;
        CurConUrl=`http://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=41c6b5c1dc1537b062654992c1950485`;
        const response=await fetch(CurConUrl);
        const place=await response.json();
        setPlace(place);
        setTemperature(place.main.temp);
        setMaxTemp(place.main.temp_max);
        setMinTemp(place.main.temp_min);
        setPressure(place.main.pressure);
        setWindSpeed(place.wind.speed)
        setType(place.weather[0].main);
        setHumid(place.main.humidity);

    }

    return (
        <div className="weather-body">
            <h1 className="weather-head"> ⛈ Weather Info ⚡
                <div>
                    <Link to="/" className="back-arrow">
                        <i className="back-arrow">⬅Back</i>
                    </Link>
                </div>
            </h1>
            <hr className="style-two"></hr>
                {
                    <div className="content">
                         { place.name =='Innichen' ?  <h3>Place: <span className="wea-span">India</span></h3> : <h3>Place: <span className="wea-span">{place.name}</span></h3>}
                        <div>Visibility: <span className="wea-span">{place.visibility == null ? '' : place.visibility}</span></div>
                        <div>Timezone: <span className="wea-span">{place.timezone == null ? '' : place.timezone}</span></div>
                        <div>Temperature: <span className="wea-span">{temperature}</span></div>
                        <div>Minimum Temperature: <span className="wea-span">{minTemp}</span></div>
                        <div>Maximum Temperature: <span className="wea-span">{maxTemp}</span></div>
                        <div>Pressure: <span className="wea-span">{pressure}</span></div>
                        <div>Windspeed: <span className="wea-span">{windSpeed}</span></div>
                        <div>Type: { weatherType ? <span className="wea-span">{weatherType}</span> : <span className="wea-span">-</span> }</div>
                        <div>Humidity: <span className="wea-span">{humid}</span></div>
                    </div>
                }
            <div className="content">

                <input style ={{ whiteSpace: 'normal'}} type="text" name="location" id="location" placeholder="Speak out country/Enter place "></input>
                <button className="btn-weather" onClick={() => changePlace(document.getElementById("location").value)}>Check Weather</button>
            </div>
            <PushToTalkButtonContainer>
                <PushToTalkButton />
                <ErrorPanel />
            </PushToTalkButtonContainer>

        </div>
    );
}

export default CurrencyConvert;