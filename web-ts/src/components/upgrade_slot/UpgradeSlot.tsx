import * as React from 'react';
import { Upgrade, UpgradeSlotType } from '../../client/Upgrade';
import { UpgradeItem } from 'upgrade_shop/UpgradeItem';

export interface UpgradeSlotProps {
  type: UpgradeSlotType;
  upgrade?: Upgrade;
}

export default class UpgradeSlot extends React.Component<UpgradeSlotProps, {}> {
  render() {
    const { type } = this.props;

    return (
      <div className="upgrade-slot">
        <button className="upgrade-slot-button">
          <span className="upgrade-slot-button-icon">
            {/*this should have a symbol/icon */}
          </span>
          <span className="upgrade-slot-button-slot-name">
            {UpgradeSlotType[type]}
          </span>
        </button>
      </div>
    );
  }
}
