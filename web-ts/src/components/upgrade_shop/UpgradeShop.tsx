import * as React from 'react';

import { Upgrade } from '../../client/Upgrade';
import { UpgradeItem } from './UpgradeItem';

export interface UpgradeShopProps {
  current_xp: number;
  upgrades: Upgrade[];
  onPurchase: (id: number) => void;
}

export default class UpgradeShop extends React.Component<UpgradeShopProps, {}> {
  listUpgrades({ current_xp, upgrades, onPurchase }: UpgradeShopProps) {
    return upgrades.map((upgrade, i) => (
      <UpgradeItem
        current_xp={current_xp}
        upgrade={upgrade}
        onPurchase={onPurchase}
        key={i}
      />
    ));
  }

  render() {
    const { upgrades } = this.props;
    return (
      <div className="upgrade-shop">
        <button className="button-cancel">Cancel</button>
        <ul>{!!upgrades && this.listUpgrades(this.props)}</ul>
      </div>
    );
  }
}
