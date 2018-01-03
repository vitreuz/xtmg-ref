import React from "react";
import ReactDOM from "react-dom";
import "xwing-miniatures-font/dist/xwing-miniatures.css";

import "./index.css";

/* ManeuverSquare is a represetnation of a single maneuver square */
function ManeuverSquare(props) {
  if (props.bearing) {
    const maneuver =
      (props.color ? props.color + "-" : "") +
      "manuevers-font xwing-miniatures-font-" +
      props.bearing;

    return (
      <div className="square">
        <i className={maneuver} />
      </div>
    );
  }

  return <div className="square" />;
}

class ManeuverCard extends React.Component {
  renderEmptySquare() {
    return <div className="square" />;
  }

  renderRow(row) {
    return row.map((maneuver) => {
      if (maneuver === null) return this.renderEmptySquare();
      const difficulty = maneuver[0];
      const bearing = maneuver[1];

      return this.renderSquare(bearing, difficulty);
    })
  }

  renderSquare(bearing, color) {
    if (isNaN(bearing)) {
      return <ManeuverSquare bearing={bearing} color={color} />;
    }
    return (
      <div className="square">
        <i className="maneuvers-font">{bearing}</i>
      </div>
    );
  }

  render() {
    const maneuvers = this.props.maneuvers;

    const rows = maneuvers.map((row, speed) => {
      speed = maneuvers.length - 1 - speed;

      return (
        < div className="board-row" >
          {this.renderSquare(speed)}
          {this.renderRow(row)}
        </div >
      )
    })

    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Ship extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maneuvers: [
        [0, 0, 0, 0, 0, 0],
        [0, 2, 2, 2, 0, 0],
        [1, 1, 2, 1, 1, 0],
        [1, 1, 1, 1, 1, 0],
        [0, 0, 1, 0, 0, 3]
      ]
    }
  }

  render() {
    const maneuvers = formatManeuvers(this.state.maneuvers);

    return (
      <div>
        <ManeuverCard maneuvers={maneuvers} />
      </div>);
  }
}

function formatManeuvers(maneuvers) {
  const maxSpeed = maneuvers.length - 1;
  let rows = Array(maxSpeed).fill([]);

  return maneuvers.map((row, i) => {
    let speed = maxSpeed - i;

    return row.map((difficulty, bearing) => {
      if (difficulty === 0) { return null; }
      return ([getDifficulty(difficulty), getBearing(bearing)]);
    })
  }).reverse();
}

function getBearing(bearing) {
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
    default:
      return null;
  }
}

function getDifficulty(difficulty) {
  switch (difficulty) {
    case 2:
      return "green";
    case 3:
      return "red";
    default:
      return null;
  }
}
// =============================================================================

ReactDOM.render(<Ship />, document.getElementById("root"));
