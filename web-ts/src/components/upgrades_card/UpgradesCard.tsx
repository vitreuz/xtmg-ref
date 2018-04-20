import * as React from 'react';
import { UpgradeSlot } from '../../client/Upgrade';
import UpgradeSlots from '../upgrade_slots/index';

export interface UgpradesCardProps {
  slots: UpgradeSlot[];
}

function UpgradesCard({ slots }: UgpradesCardProps) {
  return (
    <div>
      <div>
        <UpgradeSlots slots={slots} />
      </div>
    </div>
  );
}

export default UpgradesCard;
