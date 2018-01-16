import React from "react";
import PropTypes from "prop-types";

import { BearingCell, EmptyCell, SpeedCell } from "./ManeuverCell";
import XWingSymbols from "../Util/XWingSymbols";

export class ManeuverRow extends React.Component {
  formatBearing(index) {
    switch (index) {
      case 0:
        return XWingSymbols.Turnleft;
      case 1:
        if (this.props.speed < 0) {
          return XWingSymbols.Reversebankleft;
        }
        return XWingSymbols.Bankleft;
      case 2:
        if (this.props.speed === 0) {
          return XWingSymbols.Stop;
        }
        if (this.props.speed < 0) {
          return XWingSymbols.Reversestraight;
        }
        return XWingSymbols.Straight;
      case 3:
        if (this.props.speed < 0) {
          return XWingSymbols.Reversebankright;
        }
        return XWingSymbols.Bankright;
      case 4:
        return XWingSymbols.Turnright;
      case 5:
        return XWingSymbols.Kturn;
      case 6:
        return XWingSymbols.Sloopleft;
      case 7:
        return XWingSymbols.Sloopright;
      case 8:
        return XWingSymbols.Trollleft;
      case 9:
        return XWingSymbols.Trollright;
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
        <SpeedCell speed={this.props.speed} />
        {row.map(
          maneuver =>
            maneuver.difficulty ? (
              <BearingCell
                bearing={maneuver.bearing}
                difficulty={maneuver.difficulty}
                key={maneuver.bearing}
              />
            ) : (
              <EmptyCell key={maneuver.bearing} />
            )
        )}
      </tr>
    );
  }
}
