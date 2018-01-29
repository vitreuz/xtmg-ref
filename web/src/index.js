import React from "react";
import ReactDOM from "react-dom";

import ActionBar from "./components/ActionBar";
import Icon from "./components/Icon";
import ManeuverCard from "./components/ManeuverCard";
import Statline from "./components/Statline";

import "./index.css";
import AltStyle from "./components/Util/AlternateStyles";
import XWingFont from "./components/Util/XWingFont";
import XWingSymbols from "./components/Util/XWingSymbols";
import { NameBar } from "./components/NameBar/NameBar";

const LukeMan = {
  name: "Luke Skywalker",
  id: 5,
  unique: true,
  ship: "X-wing",
  skill: 8,
  points: 28,
  slots: ["Elite", "Torpedo", "Astromech"],
  text:
    "When defending, you may change 1 of your [Focus] results to a [Evade] result.",
  image: "pilots/Rebel Alliance/X-wing/luke-skywalker.png",
  faction: "Rebel Alliance",
  xws: "lukeskywalker"
};
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
    return (
      <div>
        <div className="ship">
          <div className="ship-top">
            <div className="ship-left">
              <div className="ship-icon">
                <Icon iconType={"ship"} symbol={xwingMan.xws} />
              </div>
              <div className="ship-statline">
                <Statline
                  altStyle={AltStyle.Vertical}
                  attack={xwingMan.attack}
                  agility={xwingMan.agility}
                  hull={xwingMan.hull}
                  shields={xwingMan.shields}
                />
              </div>
            </div>
            <div className="ship-right">
              <div className="ship-pilot-namebar">
                <NameBar name={LukeMan.name} unique={LukeMan.unique} />
              </div>
              <div className="ship-action-bar">
                <ActionBar actions={xwingMan.actions} />
              </div>
            </div>
          </div>
          <div className="ship-maneuver-card">
            <ManeuverCard maneuvers={xwingMan.maneuvers} />
          </div>
        </div>
      </div>
    );
  }
}

// =============================================================================

ReactDOM.render(<Ship />, document.getElementById("root"));
