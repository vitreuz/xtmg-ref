import React from "react";
import PropTypes from "prop-types";

export class ManeuverCell extends React.Component {
  render() {
    return !this.props.difficulty ? (
      <div className="empty-maneuver-cell" />
    ) : (
      <div className={this.props.difficulty + "-maneuver-cell"}>
        <i className={"xwing-miniatures-font-" + this.props.bearing} />
      </div>
    );
  }
}

ManeuverCell.propTypes = {
  bearing: PropTypes.oneOf([
    "leftturn",
    "leftbank",
    "straight",
    "rightbank",
    "rightturn",
    "kturn",
    "sloopleft",
    "sloopright",
    "trollleft",
    "trollright",
    "stop",
    "reversebankleft",
    "reversestraight",
    "reversebankright"
  ]).isRequired,
  difficulty: PropTypes.oneOf(["white", "green", "red"])
};
