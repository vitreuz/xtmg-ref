import * as React from 'react';

import { Upgrade, UpgradeSlotType, UpgradeSlot } from '../../client/Upgrade';
import UpgradeBase from '../upgrade_base';

export interface UpgradeSlotsProps {
  slots: UpgradeSlot[];
}

function UpgradeSlots({ slots }: UpgradeSlotsProps) {
  return (
    <div className="upgrade-slots">
      <div className="upgrade-slots-list">{listSlots(slots)}</div>
    </div>
  );
}

export default UpgradeSlots;

function listSlots(slots: UpgradeSlot[]) {
  return slots.map(({ slot, upgrade }: UpgradeSlot, i) => (
    <div className="upgrade-slot" key={i}>
      <button className="upgrade-slot-button">
        <span className="button-icon">{/* add upgrade-slot icon */}</span>
        {upgrade ? (
          <UpgradeBase upgrade={upgrade} />
        ) : (
          <span className="button-name">{UpgradeSlotType[slot]}</span>
        )}
      </button>
    </div>
  ));
}
