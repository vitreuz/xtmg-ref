import * as React from 'react';
import { Upgrade, UpgradeSlotType } from '../../client/Upgrade';

import UpgradeBase from '../upgrade_base';

export interface UpgradeSlotProps {
  type: UpgradeSlotType;
  upgrade?: Upgrade;
}

function UpgradeSlot({ type, upgrade }: UpgradeSlotProps) {
  return (
    <div className="upgrade-slot">
      <button className="upgrade-slot-button">
        <span className="button-icon">{/* add upgrade-slot icon */}</span>
        {upgrade ? (
          <UpgradeBase upgrade={upgrade} />
        ) : (
          <span className="button-name">{UpgradeSlotType[type]}</span>
        )}
      </button>
    </div>
  );
}

export default UpgradeSlot;
