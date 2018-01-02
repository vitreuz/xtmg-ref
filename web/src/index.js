import React from "react";
import ReactDOM from "react-dom";
import "xwing-miniatures-font/dist/xwing-miniatures.css";

import "./index.css";

// const xwing = [
//   [0, 0, 0, 0, 0, 0],
//   [0, 2, 2, 2, 0, 0],
//   [1, 1, 2, 1, 1, 0],
//   [1, 1, 1, 1, 1, 0],
//   [0, 0, 1, 0, 0, 3]
// ];

/* ManeuverSquare is a represetnation of a single maneuver square */
function ManeuverSquare(props) {
  if (props.bearing) {
    const maneuver =
      (props.color ? props.color + "-" : "") +
      "manuevers-font xwing-miniatures-font-" +
      props.bearing;
    console.log(maneuver);

    return (
      <div className="square">
        <i className={maneuver} />
      </div>
    );
  }

  return <div className="square" />;
}

class ManeuverCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderRow(row) {
    let render = [];
    const len = row.length;
    for (let i = 0; i < len; i++) {
      if (row[i] === 0) {
        if (i < 5) render.push(this.renderSquare());
        continue;
      }
      const bearing = getBearing(i);

      render.push(this.renderSquare(bearing));
    }

    return <div className="board-row">{render}</div>;
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
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(1)}
          {this.renderRow([0, 2, 2, 2, 0, 0])}
        </div>
      </div>
    );
  }
}

function getBearing(i) {
  switch (i) {
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
      return "";
  }
}
// =============================================================================

ReactDOM.render(<ManeuverCard />, document.getElementById("root"));
