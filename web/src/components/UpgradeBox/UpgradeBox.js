import React from "react";

import UpgradBar from "./UpgradeBar";

import "./upgradebox.css";

export class UpgradeBox extends React.Component {
  render() {
    return (
      <div className="upgradebox">
        <UpgradBar />
      </div>
    );
  }
}
