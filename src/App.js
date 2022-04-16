import { useState } from "react";
import CityNameInput from "./cityNameInput/CityNameInput";
import CityNameButton from "./cityNameButton/CityNameButton";
import DeleteArrayElemButton from "./deleteArrayElemButton/DeleteArrayElemButton";
import "./styles.css";

export default function App() {
  const [cityName, setCityName] = useState("");
  const [forecastArray, setForecastArray] = useState([]);
  let forecastElemId = -1;

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0f2a9b5e312ff75d38dfd3d371ba73ca&units=metric`;

  const getCityName = (event) => {
    setCityName(event.target.value);
  };

  const getForecast = async () => {
    if (cityName !== "") {
      const apiResponse = await fetch(apiURL, {
        method: "GET",
        headers: {
          accept: "application/json"
        }
      });

      const responseJSON = await apiResponse.json();

      if (responseJSON.cod !== "404") {
        setForecastArray([...forecastArray, responseJSON]);
      } else {
        alert("City not found");
      }
    } else {
      alert("You did not enter a city name");
    }
  };

  let deleteForecast = (event) => {
    let stateArr = forecastArray;
    const forecastElemId = event.target.id;

    stateArr.splice(forecastElemId, 1);

    setForecastArray([...stateArr]);
  };

  return (
    <div className="App">
      <CityNameInput getCityName={getCityName} />
      <CityNameButton getForecast={getForecast} />
      <div className="ForecastWrapp">
        {forecastArray.map((forecastArrayElem) => {
          forecastElemId += 1;
          return (
            <div key={forecastElemId} className="ForecastElem">
              <div className="ForecastCityName">{forecastArrayElem.name}</div>
              <div className="ForecastTemp">
                Temperature: {forecastArrayElem.main.temp} °С
              </div>
              <div className="ForecastFeelsLike">
                Feels-like Temperature: {forecastArrayElem.main.feels_like} °С
              </div>
              <div className="WeatherDescription">
                Weather Description: {forecastArrayElem.weather[0].description}
              </div>
              <div className="WindSpeed">
                Wind Speed: {forecastArrayElem.wind.speed} m/s
              </div>
              <DeleteArrayElemButton
                deleteArrayElemButtonClick={deleteForecast}
                deleteArrayElemButtonId={forecastElemId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
