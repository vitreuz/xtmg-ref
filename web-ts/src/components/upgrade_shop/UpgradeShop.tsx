import * as React from 'react';

import { Upgrade, UpgradeSlotType } from '../../client/Upgrade';
import UpgradeItem from '../upgrade_item';

export interface UpgradeShopProps {
  current_xp: number;
  upgrades: Upgrade[];
  slot?: UpgradeSlotType;
  onPurchase: (id: number) => void;
}

function UpgradeShop(props: UpgradeShopProps) {
  const { upgrades } = props;

  return (
    <div className="upgrade-shop">
      <ul>{!!upgrades && listUpgrades(props)}</ul>
    </div>
  );
}

function listUpgrades(props: UpgradeShopProps) {
  const { current_xp, slot, upgrades, onPurchase } = props;

  return upgrades.map((upgrade, i) => {
    const canClick = current_xp >= upgrade.points;
    if (slot != undefined && upgrade.slot !== slot) {
      return;
    }

    return (
      <UpgradeItem
        buttonText={'Purchase'}
        canClick={canClick}
        onClick={onPurchase}
        upgrade={upgrade}
        key={i}
      />
    );
  });
}

export default UpgradeShop;
