import React from "react";
import ReactDOM from "react-dom";
import ManeuverCard from "./components/ManeuverCard/ManeuverCard";
import "xwing-miniatures-font/dist/xwing-miniatures.css";

import "./index.css";

// const xwingMan = [
//   [],
//   [0, 2, 2, 2],
//   [1, 1, 2, 1, 1],
//   [1, 1, 1, 1, 1],
//   [0, 0, 1, 0, 0, 3]
// ];

const xwingMan = [
  [],
  [1, 0, 0, 0, 1],
  [2, 2, 2, 2, 2],
  [1, 2, 2, 2, 1, 0, 0, 0, 3, 3],
  [0, 0, 2, 0, 0, 3],
  [0, 0, 2]
];

class Ship extends React.Component {
  render() {
    return (
      <div className="main">
        <ManeuverCard maneuvers={xwingMan} />
      </div>
    );
  }
}

// =============================================================================

ReactDOM.render(<Ship />, document.getElementById("root"));
