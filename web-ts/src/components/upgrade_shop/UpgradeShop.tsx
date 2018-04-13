import * as React from 'react';

import { Upgrade } from '../../client/Upgrade';
import UpgradeItem from '../upgrade_item';

export interface UpgradeShopProps {
  current_xp: number;
  upgrades: Upgrade[];
  onPurchase: (id: number) => void;
}

function UpgradeShop(props: UpgradeShopProps) {
  const { upgrades } = props;

  return (
    <div className="upgrade-shop">
      <button className="button-cancel">Cancel</button>
      <ul>{!!upgrades && listUpgrades(props)}</ul>
    </div>
  );
}

function listUpgrades({ current_xp, upgrades, onPurchase }: UpgradeShopProps) {
  return upgrades.map((upgrade, i) => {
    const canClick = current_xp >= upgrade.id;

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
