import { Upgrade, UpgradeSlot } from 'client/Upgrade';
import * as React from 'react';
import UpgradeItem from '../upgrade_item';

interface UIProps {
  upgradeSlot?: UpgradeSlot;
  upgrades: Upgrade[];
  onEquip: (id: number) => void;
  onUnequip: (id: number) => void;
}

function UpgradeInventory(props: UIProps): JSX.Element {
  const { upgradeSlot } = props;
  const upgrade = !!upgradeSlot && upgradeSlot.upgrade;

  return (
    <div className="upgrade-inventory">
      {!!upgrade && equippedUpgrade(upgrade, props)}
      <ul className="upgrade-inventory-list">{listUpgrades(props)}</ul>
    </div>
  );
}

function equippedUpgrade(upgrade: Upgrade, props: UIProps): JSX.Element {
  const { onUnequip } = props;

  return (
    <div>
      <UpgradeItem
        upgrade={upgrade}
        buttonText={'Unequip'}
        canClick={true}
        onClick={onUnequip}
      />
    </div>
  );
}

function listUpgrades(props: UIProps): (JSX.Element | undefined)[] {
  const { upgradeSlot, upgrades } = props;
  const equipped = !!upgradeSlot ? upgradeSlot.upgrade : undefined;

  return upgrades.map((upgrade, i) => {
    if (!!upgradeSlot && upgrade.slot !== upgradeSlot.slot) {
      return;
    }

    if (!!equipped && upgrade.id === equipped.id) {
      return;
    }

    return (
      <li className="upgrade-inventory-list-item" key={i}>
        <UpgradeItem
          upgrade={upgrade}
          buttonText={'Equip'}
          canClick={true}
          onClick={handleClick(props)}
        />
      </li>
    );
  });
}

function handleClick(props: UIProps): ((id: number) => void) {
  const { onEquip, onUnequip, upgradeSlot } = props;
  const equipped = !!upgradeSlot ? upgradeSlot.upgrade : undefined;

  return (id: number) => {
    if (!!equipped) {
      onUnequip(equipped.id);
    }

    onEquip(id);
  };
}

export default UpgradeInventory;
