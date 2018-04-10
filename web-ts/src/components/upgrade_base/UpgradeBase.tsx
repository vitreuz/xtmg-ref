import * as React from "react";

import { Upgrade } from "../../client/Upgrade";

export interface UpgradeBaseProps {
  upgrade: Upgrade;
}

export default function UpgradeBase({ upgrade }: UpgradeBaseProps) {
  const textHTML = { __html: upgrade.text };

  return (
    <div className="upgrade-item">
      <div className="upgrade-item-name">
        <span className="field-value">{upgrade.name}</span>
      </div>
      {!!upgrade.attack && combatDetails(upgrade)}
      <div className="upgrade-item-text" dangerouslySetInnerHTML={textHTML} />
    </div>
  );
}

function combatDetails(upgrade: Upgrade) {
  return (
    <div className="upgrade-item-combat">
      <div className="upgrade-item-combat-attack">
        <span className="field-icon" />
        <span className="field-value">{upgrade.attack}</span>
      </div>
      <div className="upgrade-item-combat-range">
        <span className="field-name">Range</span>{" "}
        <span className="field-value">{upgrade.range}</span>
      </div>
    </div>
  );
}
