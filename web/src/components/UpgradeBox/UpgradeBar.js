import React from "react";

import Icon from "../Icon";

export class UpgradeBar extends React.Component {
  render() {
    const { unused } = this.props;

    return (
      <div className="upgrade-bar">
        <div className="upgrade-bar-slots">
          {unused.map(slot => (
            <div className="upgrade-icon">
              <Icon iconType={"upgrade"} symbol={slot} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
