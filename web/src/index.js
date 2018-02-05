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
import { UpgradeBox } from "./components/UpgradeBox/UpgradeBox";

const Pilots = new Map([
  [
    "lukeskywalker",
    {
      name: "Luke Skywalker",
      id: 5,
      unique: true,
      ship: "X-wing",
      skill: 8,
      points: 28,
      slots: ["elite", "torpedo", "astromech"],
      text:
        "When defending, you may change 1 of your [Focus] results to a [Evade] result.",
      image: "pilots/Rebel Alliance/X-wing/luke-skywalker.png",
      faction: "Rebel Alliance",
      xws: "lukeskywalker"
    }
  ]
]);

const Ships = new Map([
  [
    "xwing",
    {
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
    }
  ]
]);

const Upgrades = new Map([
  [
    "r2astromech",
    {
      name: "R2 Astromech",
      id: 2,
      slot: "Astromech",
      points: 1,
      text: "You may treat all 1- and 2-speed maneuvers as green maneuvers.",
      image: "upgrades/Astromech/r2-astromech.png",
      xws: "r2astromech"
    }
  ],
  [
    "hullupgrade",
    {
      name: "Hull Upgrade",
      id: 179,
      slot: "Modification",
      points: 3,
      text: "Increase your hull value by 1.",
      image: "upgrades/Modification/hull-upgrade.png",
      xws: "hullupgrade",
      grants: [
        {
          type: "stats",
          name: "hull",
          value: 1
        }
      ]
    }
  ]
]);

const unit = {
  name: "lukeskywalker",
  ship: "xwing",
  upgrades: new Map([
    ["astromech", "r2astromech"],
    ["modification", "hullupgrade"]
  ])
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
    const pilot = Pilots.get(unit.name);
    const ship = Ships.get(unit.ship);

    const upgrades = Array.from(unit.upgrades).map(([key, value]) => [
      key,
      Upgrades.get(value)
    ]);

    console.log(upgrades);

    return (
      <div>
        <div className="ship">
          <div className="ship-top">
            <div className="ship-left">
              <div className="ship-icon">
                <Icon iconType={"ship"} symbol={ship.xws} />
              </div>
              <div className="ship-statline">
                <Statline
                  altStyle={AltStyle.Vertical}
                  attack={ship.attack}
                  agility={ship.agility}
                  hull={ship.hull}
                  shields={ship.shields}
                />
              </div>
            </div>
            <div className="ship-right">
              <div className="ship-pilot-namebar">
                <NameBar name={pilot.name} unique={pilot.unique} />
              </div>
              <div className="ship-action-bar">
                <ActionBar actions={ship.actions} />
              </div>
              <div className="ship-upgradebox">
                <UpgradeBox slots={pilot.slots} upgrades={upgrades} />
              </div>
            </div>
          </div>
          <div className="ship-maneuver-card">
            <ManeuverCard maneuvers={ship.maneuvers} />
          </div>
        </div>
      </div>
    );
  }
}

// =============================================================================

ReactDOM.render(<Ship />, document.getElementById("root"));
