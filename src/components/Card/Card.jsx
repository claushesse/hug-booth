import React from "react";
import classnames from "classnames";
import "./Card.css";

export const Card = ({ name, color, opacity, selected, id }) => {
  return (
    <div
      style={{
        backgroundColor: selected ? "black" : color,
        color: selected ? "white" : "black",
        opacity,
      }}
      className={classnames("card", {
        selected: selected && id !== 7,
        winner: selected && id === 7,
      })}
    >
      {name}
    </div>
  );
};
