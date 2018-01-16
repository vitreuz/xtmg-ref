import React from "react";
import PropTypes from "prop-types";

import { ManeuverRow } from "./ManeuverRow";
import "./maneuvercard.css";

export class ManeuverCard extends React.Component {
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
        <tbody>
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
        </tbody>
      </table>
    );
  }
}

ManeuverCard.propTypes = {
  maneuvers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};
