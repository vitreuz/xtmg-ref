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

export class ManeuverRow extends React.Component {
  formatRow() {
    const row = this.props.row;
    var formattedRow = [];

    if (row[8]) {
      formattedRow.push(row[8]);
    }
    if (row[6]) {
      formattedRow.push(row[6]);
    }
    formattedRow = formattedRow.concat(row.slice(0, 5));
    if (row[7]) {
      formattedRow.push(row[7]);
    }
    if (row[9]) {
      formattedRow.push(row[9]);
    }
    formattedRow.push(row[5]);

    return formattedRow;
  }

  render() {
    const row =
      this.props.row.length > 6
        ? this.formatRow(this.props.row)
        : this.props.row;

    return (
      <div className="maneuver-row">
        <div className="speed-cell">{this.props.speed}</div>
        {row.map(maneuver => {
          const bearing =
            this.props.speed < 0
              ? "reverse" + maneuver.bearing
              : this.props.speed === 0 && maneuver.bearing === "straight"
                ? "stop"
                : maneuver.bearing;

          return (
            <ManeuverCell
              bearing={bearing}
              difficulty={maneuver.difficulty}
              key={maneuver.bearing}
            />
          );
        })}
      </div>
    );
  }
}

ManeuverCell.propTypes = {
  bearing: PropTypes.oneOf([
    "turnleft",
    "bankleft",
    "straight",
    "bankright",
    "turnright",
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

ManeuverRow.propTypes = {
  row: PropTypes.arrayOf(
    PropTypes.shape({
      bearing: PropTypes.string.isRequired,
      difficulty: PropTypes.string
    })
  ).isRequired,
  speed: PropTypes.number.isRequired
};
