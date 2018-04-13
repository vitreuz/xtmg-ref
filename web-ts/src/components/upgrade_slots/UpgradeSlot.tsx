import * as React from 'react';
import { Upgrade, UpgradeSlotType } from '../../client/Upgrade';

import UpgradeBase from '../upgrade_base';

export interface UpgradeSlotProps {
  slot: UpgradeSlotType;
  upgrade?: Upgrade;
}

function UpgradeSlot({ slot, upgrade }: UpgradeSlotProps) {
  return (
    <div className="upgrade-slot">
      <button className="upgrade-slot-button">
        <span className="button-icon">{/* add upgrade-slot icon */}</span>
        {upgrade ? (
          <UpgradeBase upgrade={upgrade} />
        ) : (
          <span className="button-name">{UpgradeSlotType[slot]}</span>
        )}
      </button>
    </div>
  );
}

export default UpgradeSlot;
