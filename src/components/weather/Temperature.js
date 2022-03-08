// https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=91f0ca3c922b0f4da9bbf78216af8bd8

import React, { useEffect, useState } from 'react'
import './style.css'
import WeatherCard from './WeatherCard'

const Temperature = () => {

    const [searchValue, setSearchValue] = useState("Karachi");
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=91f0ca3c922b0f4da9bbf78216af8bd8`
            let res = await fetch(url);
            let data = await res.json();

            const { temp, pressure, humidity } = data.main;
            const { main: weatherMood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myWeatheInfo = {
                temp,
                pressure,
                humidity,
                weatherMood,
                name,
                speed,
                country,
                sunset
            };

            setTempInfo(myWeatheInfo);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWeatherInfo()
    }, [])

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input
                        type="search"
                        placeholder="search..."
                        id="search"
                        className="searchTerm"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                    <button className="searchButton" type="button" onClick={getWeatherInfo}>
                        Search
                    </button>
                </div>
            </div>


            <WeatherCard tempInfo={tempInfo} />

        </>
    )
}

export default Temperature