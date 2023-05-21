import React, { useState } from "react";
import axios from "axios";

function SearchEngine() {
  const [city, setCity] = useState(" ");
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [isShown, setIsShown] = useState(false);

  function Temperature() {
    if (temperature) {
      return {
        temperature: temperature,
        humidity: humidity,
        wind: wind,
      };
    }
    return {};
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=a163a00e6099e0b4d7da2e23a921eeff&units=metric";
    axios.get(url).then(function (response) {
      setTemperature(response.data.main.temp);
      setHumidity(response.data.main.humidity);
      setWind(response.data.wind.speed);
      setIsShown(true);
    });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="search" onChange={updateCity} />
        <input type="submit" value="search" />
      </div>
      {isShown && (
        <ul>
          The weather in {city} is:
          <li> Temperature: {Temperature().temperature} </li>
          <li> Humidity: {Temperature().humidity} </li>
          <li> Wind: {Temperature().wind} </li>
        </ul>
      )}
    </form>
  );
}

export default SearchEngine;
