import React from "react";
import classnames from "classnames";
import "./Card.css";

export const Card = ({ name, color, opacity, selected }) => {
  return (
    <div
      style={{ backgroundColor: color, opacity }}
      className={classnames("card", { selected: selected })}
    >
      {name}
    </div>
  );
};
