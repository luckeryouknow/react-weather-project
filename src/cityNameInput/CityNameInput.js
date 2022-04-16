import React from "react";

export default function CityNameInput(props) {
  return <input onChange={props.getCityName} className="CityNameInput"></input>;
}
