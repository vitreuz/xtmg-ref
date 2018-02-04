import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import ActionBar from "../components/ActionBar";
import Icon from "../components/Icon";
import Statline from "../components/Statline";
import ManeuverCard from "../components/ManeuverCard";
import XWingFont from "../components/Util/XWingFont";
import AltStyles from "../components/Util/AlternateStyles";
import { UpgradeBox } from "../components/UpgradeBox/UpgradeBox";

const lukeskywalker = {
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
};

const xwing = {
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

const r2d2 = {
  name: "R2 Astromech",
  id: 2,
  slot: "Astromech",
  points: 1,
  text: "You may treat all 1- and 2-speed maneuvers as green maneuvers.",
  image: "upgrades/Astromech/r2-astromech.png",
  xws: "r2astromech"
};

const hullupgrade = {
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
};

// storiesOf("Welcome", module).add("to Storybook", () => (
//   <Welcome showApp={linkTo("Button")} />
// ));

// storiesOf("Button", module)
//   .add("with text", () => (
//     <Button onClick={action("clicked")}>Hello Button</Button>
//   ))
//   .add("with some emoji", () => (
//     <Button onClick={action("clicked")}>😀 😎 👍 💯</Button>
//   ));

storiesOf("ActionBar", module).add("default state", () => (
  <ActionBar actions={xwing.actions} />
));

storiesOf("Icon", module)
  .add("default ship", () => <Icon iconType={"ship"} symbol={xwing.xws} />)
  .add("default upgrade", () => (
    <Icon iconType={"upgrade"} symbol={"astromech"} />
  ));
storiesOf("Statline", module)
  .add("horizontal", () => (
    <Statline
      agility={xwing.agility}
      attack={xwing.attack}
      hull={xwing.hull}
      shields={xwing.shields}
    />
  ))
  .add("vertical", () => (
    <Statline
      altStyle={AltStyles.Vertical}
      agility={xwing.agility}
      attack={xwing.attack}
      hull={xwing.hull}
      shields={xwing.shields}
    />
  ));

storiesOf("ManeuverCard", module)
  .add("default state", () => <ManeuverCard maneuvers={xwing.maneuvers} />)
  .add("maxed state", () => (
    <ManeuverCard
      maneuvers={[
        [0, 0, 3],
        [0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 3, 3, 3],
        [1, 1, 2, 1, 1, 0, 3, 3, 3, 3],
        [1, 1, 2, 1, 1, 3]
      ]}
    />
  ));

storiesOf("UpgradeBox", module).add("empty card", () => (
  <UpgradeBox slots={lukeskywalker.slots} upgrades={[]} />
));
