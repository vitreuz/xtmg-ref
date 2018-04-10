import * as React from "react";

import { Upgrade } from "../../client/Upgrade";
import UpgradeBase from "../upgrade_base";

export interface UpgradeItemProps {
  upgrade: Upgrade;
  current_xp: number;
  onPurchase: (id: number) => void;
}

export function UpgradeItem({
  upgrade,
  current_xp,
  onPurchase
}: UpgradeItemProps) {
  const textHTML = { __html: upgrade.text };
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

function combatDetails(upgrade: Upgrade) {
  return (
    <div className="upgrade-item-combat">
      <div className="upgrade-item-combat-attack">
        <span className="field-value">{upgrade.attack}</span>
      </div>
      <div className="upgrade-item-combat-range">
        <span className="field-name">Range</span>{" "}
        <span className="field-value">{upgrade.range}</span>
      </div>
    </div>
  );
}