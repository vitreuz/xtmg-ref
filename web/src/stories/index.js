import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import ActionBar from "../components/ActionBar/ActionBar";
import Statline from "../components/Statline/Statline";
import XWingFont from "../components/Util/XWingFont";

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
  <ActionBar actions={["focus", "targetlock"]} />
));

storiesOf("Statline", module).add("default state", () => (
  <Statline agility={2} attack={3} hull={3} shield={2} />
));
