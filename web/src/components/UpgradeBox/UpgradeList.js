import React from "react";
import { Icon } from "../Icon/Icon";
import XWingFont from "../Util/XWingFont";

export class UpgradeList extends React.Component {
  render() {
    const { upgrades } = this.props;

    return (
      <div className="upgrade-list">
        {upgrades.map(([slot, upgrade]) => (
          <div className="upgrade-list-element">
            <div className="upgrade-list-element-text">
              <Icon iconType={"upgrade"} symbol={slot} />
              <div className="upgrade-name">
                {upgrade.unique ? (
                  <XWingFont fontType={"font"} symbol={"unique"} />
                ) : (
                  ""
                )}
                {upgrade.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
