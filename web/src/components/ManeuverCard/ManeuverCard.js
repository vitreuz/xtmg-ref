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
  formatBearing(bearing) {
    switch (bearing) {
      case 0:
        return "turnleft";
      case 1:
        return "bankleft";
      case 2:
        return "straight";
      case 3:
        return "bankright";
      case 4:
        return "turnright";
      case 5:
        return "kturn";
      case 6:
        return "sloopleft";
      case 7:
        return "sloopright";
      case 8:
        return "trollleft";
      case 9:
        return "trollright";
    }
  }

  formatDifficulty(difficulty) {
    switch (difficulty) {
      case 0:
        return null;
      case 1:
        return "white";
      case 2:
        return "green";
      case 3:
        return "red";
    }
  }

  formatRow() {
    const row = this.props.row.map((difficulty, bearing) => {
      print(difficulty);
      return {
        bearing: this.formatBearing(bearing),
        difficulty: this.formatDifficulty(difficulty)
      };
    });

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
    const row = this.formatRow(this.props.row);

    return (
      <div className="maneuver-row">
        <div className="speed-cell">{this.props.speed}</div>
        {row.map(maneuver => {
          const bearing =
            this.props.speed < 0 &&
            ["bankleft", "bankright", "straight"].includes(maneuver.bearing)
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
  row: PropTypes.arrayOf(PropTypes.number).isRequired,
  speed: PropTypes.number.isRequired
};
