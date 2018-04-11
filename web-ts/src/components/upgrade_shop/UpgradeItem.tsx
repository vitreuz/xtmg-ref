import * as React from 'react';

import { Upgrade } from '../../client/Upgrade';
import UpgradeBase from '../upgrade_base';

export interface UpgradeItemProps {
  current_xp: number;
  upgrade: Upgrade;
  onPurchase: (id: number) => void;
}

function UpgradeItem({ current_xp, upgrade, onPurchase }: UpgradeItemProps) {
  const canPurchase = current_xp - upgrade.points >= 0;
  const handleClick = () => onPurchase(upgrade.id);

  return (
    <div className="upgrade-item">
      <UpgradeBase upgrade={upgrade} />
      <div className="upgrade-item-cost">
        <span className="field-value">{upgrade.points}</span>
      </div>
      <button disabled={!canPurchase} onClick={handleClick}>
        Purchase
      </button>
    </div>
  );
}

export default UpgradeItem;
