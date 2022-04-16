import React from "react";

export default function DeleteArrayElemButton(props) {
  return (
    <button
      onClick={props.deleteArrayElemButtonClick}
      id={props.deleteArrayElemButtonId}
      className="DeleteArrayElemButton"
    >
      ╳
    </button>
  );
}
