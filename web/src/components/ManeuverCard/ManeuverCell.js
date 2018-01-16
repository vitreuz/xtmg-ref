import React from "react";
// import PropTypes from "prop-types";

import XWingFont from "../Util/XWingFont";

function ManeuverCell(props) {
  return (
    <td
      className={props.border ? "bordered-maneuver-cell" : "maneuver-cell"}
      style={{ backgroundColor: props.bgcolor }}
    >
      {props.children}
    </td>
  );
}

export function EmptyCell(props) {
  return (
    <ManeuverCell>
      <div className="empty-cell" />
    </ManeuverCell>
  );
}

export function BearingCell(props) {
  const color = (difficulty => {
    switch (difficulty) {
      case "white":
        return "#FCFCFB";
      case "green":
        return "#7EDA24";
      case "red":
        return "#F5171D";
      default:
        return;
    }
  })(props.difficulty);

  return (
    <ManeuverCell bgcolor="#cbcbcb" border={true}>
      <div className="bearing-cell" style={{ color: color }}>
        <XWingFont symbol={props.bearing} />
      </div>
    </ManeuverCell>
  );
}

export function SpeedCell(props) {
  return (
    <ManeuverCell bgcolor="#2e2d3b">
      <div className="speed-cell">{props.speed}</div>
    </ManeuverCell>
  );
}
