import * as React from 'react';
import { Upgrade } from '../../client/Upgrade';

import UpgradeBase from '../upgrade_base';

export interface UpgradeItemProps {
  buttonText: string;
  canClick: boolean;
  onClick: (id: number) => void;
  upgrade: Upgrade;
}

function UpgradeItem(props: UpgradeItemProps) {
  const { canClick, buttonText, onClick, upgrade } = props;

  // const canPurchase = current_xp - upgrade.points >= 0;
  const handleClick = () => onClick(upgrade.id);

  return (
    <div className="upgrade-item">
      <UpgradeBase upgrade={upgrade} />
      <div className="upgrade-item-cost">
        <span className="field-value">{upgrade.points}</span>
      </div>
      <button disabled={!canClick} onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
}

export default UpgradeItem;
