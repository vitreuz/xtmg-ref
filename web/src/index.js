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
  renderRow(row) {
    let render = [];
    const len = row.length;
    for (let i = 0; i < len; i++) {
      if (row[i] === 0) {
        if (i < 5) render.push(this.renderSquare());
        continue;
      }
      const bearing = getBearing(i);
      let color;
      if (row[i] > 1) {
        color = row[i] === 2 ? "green" : "red";
      }

      render.push(this.renderSquare(bearing, color));
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
      // maneuvers: [
      //   [0, 0, 0, 0, 0, 0],
      //   [0, 2, 2, 2, 0, 0],
      //   [1, 1, 2, 1, 1, 0],
      //   [1, 1, 1, 1, 1, 0],
      //   [0, 0, 1, 0, 0, 3]
      // ]
    }
  }

  render() {
    return (
      <div>
        <ManeuverCard maneuvers={[
          [0, 0, 1, 0, 0, 3],
          [1, 1, 1, 1, 1, 0],
          [1, 1, 2, 1, 1, 0],
          [0, 2, 2, 2, 0, 0],
          [0, 0, 0, 0, 0, 0]
        ]
        } />
      </div>);
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

ReactDOM.render(<Ship />, document.getElementById("root"));
