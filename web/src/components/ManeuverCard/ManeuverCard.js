import React from "react";
import PropTypes from "prop-types";

export class ManeuverCell extends React.Component {
  render() {
    return !this.props.difficulty ? (
      <td className="empty-maneuver-cell" />
    ) : (
      <td className={this.props.difficulty + "-maneuver-cell"}>
        <i className={"xwing-miniatures-font-" + this.props.bearing} />
      </td>
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
      default:
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
      default:
    }
  }

  formatRow() {
    const row = this.props.row.map((difficulty, bearing) => ({
      bearing: this.formatBearing(bearing),
      difficulty: this.formatDifficulty(difficulty)
    }));

    var formattedRow = [];

    if (row[8] && this.props.hasTroll) {
      formattedRow.push(row[8]);
    }
    if (row[6] && this.props.hasSloop) {
      formattedRow.push(row[6]);
    }
    formattedRow = formattedRow.concat(row.slice(0, 5));
    if (row[7] && this.props.hasSloop) {
      formattedRow.push(row[7]);
    }
    if (row[9] && this.props.hasTroll) {
      formattedRow.push(row[9]);
    }
    formattedRow.push(row[5]);

    return formattedRow;
  }

  render() {
    const row = this.formatRow(this.props.row);

    return (
      <tr className="maneuver-row">
        <td className="speed-cell">{this.props.speed}</td>
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
      </tr>
    );
  }
}

export default class ManeuverCard extends React.Component {
  calculateOffset() {
    const counter = (accumulater, current) => accumulater + current;
    let hasZero, hasNegative;
    if (this.props.maneuvers[0].length) {
      hasZero = this.props.maneuvers[0].reduce(counter) > 1;
    }
    if (this.props.maneuvers[1].slice(10, 13).length) {
      hasNegative = this.props.maneuvers[1].slice(10, 13).reduce(counter) > 1;
    }

    return hasNegative ? -1 : hasZero ? 0 : 1;
  }

  formatRows(offset) {
    let rows = [];
    switch (offset) {
      case -1:
        rows = [[0].concat(this.props.maneuvers[1].slice(10, 13))].concat(
          [this.props.maneuvers[0]],
          [this.props.maneuvers[1].slice(0, 10)],
          this.props.maneuvers.slice(2)
        );
        break;
      case 0:
        rows = this.props.maneuvers.slice(0, 5);
        break;
      case 1:
        rows = this.props.maneuvers.slice(1, 6);
        break;
      default:
    }

    if (rows.length < 5) {
      rows.push([]);
    }

    rows = rows.map(row => {
      while (row[row.length - 1] === 0) {
        row.pop();
      }
      return row;
    });

    const longest = rows.reduce((a, b) => (a.length > b.length ? a : b)).length;
    const maxLen = longest < 6 ? 6 : longest;

    return rows.map(row => {
      if (row.length < maxLen) {
        row = row.concat(Array(maxLen - row.length).fill(0));
      }
      return row;
    });
  }

  render() {
    const offset = this.calculateOffset();
    const rows = this.formatRows(offset);

    const bearingCounts = rows.reduce((a, b) =>
      a.map((val, i) => (b[i] ? val + b[i] : val))
    );

    const hasSloop = bearingCounts[6] || bearingCounts[7] ? true : false;
    const hasTroll = bearingCounts[8] || bearingCounts[9] ? true : false;

    return (
      <table className="maneuver-table">
        {rows
          .map((row, speed) => (
            <ManeuverRow
              hasSloop={hasSloop}
              hasTroll={hasTroll}
              row={row}
              speed={speed + offset}
              key={speed + offset}
            />
          ))
          .reverse()}
      </table>
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
  hasSloop: PropTypes.bool,
  hasTroll: PropTypes.bool,
  row: PropTypes.arrayOf(PropTypes.number).isRequired,
  speed: PropTypes.number.isRequired
};

ManeuverCard.propTypes = {
  maneuvers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};
