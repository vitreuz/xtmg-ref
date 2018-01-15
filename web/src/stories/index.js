import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import ActionBar from "../components/ActionBar/ActionBar";
import Statline from "../components/Statline/Statline";
import ManeuverCard from "../components/ManeuverCard/ManeuverCard";
import XWingFont from "../components/Util/XWingFont";

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
  <ActionBar actions={xwingMan.actions} />
));

storiesOf("Statline", module).add("default state", () => (
  <Statline
    agility={xwingMan.agility}
    attack={xwingMan.attack}
    hull={xwingMan.hull}
    shields={xwingMan.shields}
  />
));

storiesOf("ManeuverCard", module).add("default state", () => (
  <ManeuverCard maneuvers={xwingMan.maneuvers} />
));
