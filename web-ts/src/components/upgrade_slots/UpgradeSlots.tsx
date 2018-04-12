import * as React from 'react';

import { Upgrade, UpgradeSlotType } from '../../client/Upgrade';
import UpgradeSlot from './UpgradeSlot';

export interface UpgradeSlotsProps {
  slots: UpgradeSlotType[];
  upgrades: Upgrade[];
}

class UpgradeSlots extends React.Component<UpgradeSlotsProps, {}> {
  listSlots({ slots, upgrades }: UpgradeSlotsProps) {
    return slots.map((slot, i) => {
      const upgrade = upgrades[i];
      if (upgrade && upgrade.id) {
        return <UpgradeSlot type={slot} upgrade={upgrade} key={i} />;
      }

      return <UpgradeSlot type={slot} key={i} />;
    });
  }

  render() {
    return (
      <div className="upgrade-slots">
        <div className="upgrade-slots-list">{this.listSlots(this.props)}</div>
      </div>
    );
  }
}

export default UpgradeSlots;
