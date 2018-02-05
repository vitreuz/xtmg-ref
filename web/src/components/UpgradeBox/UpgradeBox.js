import React from "react";

import { UpgradeBar } from "./UpgradeBar";
import { UpgradeList } from "./UpgradeList";

import "./upgradebox.css";

export class UpgradeBox extends React.Component {
  splitSlots() {
    const { slots, upgrades } = this.props;
    const possibleSlots = slots.concat(["modification"], ["title"]).sort();
    const upgradesSlots = upgrades.map(([slot, upgrade]) => slot);

    return possibleSlots.filter(slot => !upgradesSlots.includes(slot));
  }

  render() {
    const { slots, upgrades } = this.props;
    const unusedSlots = this.splitSlots();

    return (
      <div className="upgradebox">
        {upgrades.length > 0 ? <UpgradeList upgrades={upgrades} /> : ""}
        <UpgradeBar unused={unusedSlots} />
      </div>
    );
  }
}
