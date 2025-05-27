import React, { useState } from 'react'
import './Weather.css'
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import humidity_icon from "../assets/humidity.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"
import axios from "axios"


const Weather = () => {

    const [city, setCity] = useState("")

    const [humidity, setHumidity] = useState("")
    const [windSpeed, setWindSpeed] = useState("")
    const [location, setLocation] = useState("")
    const [temperature, setTemperature] = useState("")
    const [weatherIcon, setWeatherIcon] = useState(clear_icon)
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,

    }

    function handleCity(evt) {
        setCity(evt.target.value)
    }
    function getWeather() {
        let weatherData = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d5acfa4d3d441352453f80a3739a5298`)

        weatherData.then(function (success) {
            console.log(success)
            setHumidity(success.data.main.humidity)
            setWindSpeed(success.data.wind.speed)
            setLocation(success.data.name)
            setTemperature(success.data.main.temp)

            const iconCode = success.data.weather[0].icon;
            const icon = allIcons[iconCode] || clear_icon;
            setWeatherIcon(icon);
        })
    }
    return (
        <div className='weather'>
            <div className="search-bar">
                <input onChange={handleCity} type="text" placeholder='search' />
                <img className='search-bar' src={search_icon} alt="" onClick={getWeather} />
            </div>
            <img className='weather-icon' src={weatherIcon} alt="" />
            <p className='temperature'>{temperature}°c</p>
            <p className='location'>{location}</p>

            <div className="weather-data">

                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p >{humidity}</p>
                        <span className='options'>Humidity</span>
                    </div>
                </div>

                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{windSpeed}km/hr</p>
                        <span className='options'>Wind speed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather