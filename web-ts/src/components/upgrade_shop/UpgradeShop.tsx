import * as React from 'react';

import { Upgrade, UpgradeSlot } from 'client/Upgrade';
import UpgradeItem from '../upgrade_item';

interface USProps {
  current_xp: number;
  upgrades: Upgrade[];
  upgradeSlot?: UpgradeSlot;
  onPurchase: (id: number) => void;
  onEquip: (id: number) => void;
}

function UpgradeShop(props: USProps) {
  const { upgrades } = props;

  return (
    <div className="upgrade-shop">
      <ul>{!!upgrades && listUpgrades(props)}</ul>
    </div>
  );
}

function listUpgrades(props: USProps) {
  const { current_xp, upgradeSlot, upgrades } = props;

  return upgrades.map((upgrade, i) => {
    const canClick = current_xp >= upgrade.points;
    if (!!upgradeSlot && upgrade.slot !== upgradeSlot.slot) {
      return;
    }

    return (
      <li className="upgrade-shop-item" key={i}>
        <UpgradeItem
          buttonText={'Purchase'}
          canClick={canClick}
          onClick={handleClick(props)}
          upgrade={upgrade}
        />
      </li>
    );
  });
}

function handleClick(props: USProps): (id: number) => void {
  const { upgradeSlot, onPurchase, onEquip } = props;
  const equipped = !!upgradeSlot ? upgradeSlot.upgrade : undefined;

  return (id: number) => {
    onPurchase(id);

    if (!equipped) {
      onEquip(id);
    }
  };
}

export default UpgradeShop;
