import React from "react";
import ReactDOM from "react-dom";

import ActionBar from "./components/ActionBar/ActionBar";
import ManeuverCard from "./components/ManeuverCard/ManeuverCard";
import Statline from "./components/Statline/Statline";

import "xwing-miniatures-font/dist/xwing-miniatures.css";

import "./index.css";

const xwingMan = {
  name: "X-wing",
  faction: ["Rebel Alliance"],
  attack: 3,
  agility: 2,
  hull: 3,
  shields: 2,
  actions: ["Focus", "Target Lock"],
  maneuvers: [
    [0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 0, 0],
    [1, 1, 2, 1, 1, 0],
    [1, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 3]
  ],
  size: "small",
  xws: "xwing",
  id: 0,
  firing_arcs: ["Front"]
};

// const xwingMan = [
//   [],
//   [1, 0, 0, 0, 1],
//   [2, 2, 2, 2, 2],
//   [1, 2, 2, 2, 1, 0, 0, 0, 3, 3],
//   [0, 0, 2, 0, 0, 3],
//   [0, 0, 2]
// ];

class Ship extends React.Component {
  render() {
    const ship = xwingMan;

    return (
      <div className="main">
        <ActionBar actions={xwingMan.actions} />
        <ManeuverCard maneuvers={xwingMan.maneuvers} />
        <Statline
          attack={xwingMan.attack}
          agility={xwingMan.agility}
          hull={xwingMan.hull}
          shields={xwingMan.shields}
        />
      </div>
    );
  }
}

// =============================================================================

ReactDOM.render(<Ship />, document.getElementById("root"));
