import React from "react";

export default function CityNameButton(props) {
  return (
    <button onClick={props.getForecast} className="GetForecastButton">
      Add Location
    </button>
  );
}
