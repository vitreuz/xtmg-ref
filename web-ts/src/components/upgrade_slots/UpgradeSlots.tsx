import * as React from 'react';
import { UpgradeSlot, UpgradeSlotType } from '../../client/Upgrade';
import UpgradeBase from '../upgrade_base';
import { FontType } from '../xwing_font/XWingFont';
import XWingFont from '../xwing_font/index';

export interface USProps {
  onSelect: (upgradeSlot: UpgradeSlot) => void;
  slots: UpgradeSlot[];
}

function UpgradeSlots(props: USProps) {
  return (
    <div className="upgrade-slots">
      <div className="upgrade-slots-list">{listSlots(props)}</div>
    </div>
  );
}

function listSlots(props: USProps) {
  const { slots, onSelect } = props;

  return slots.map((upgradeSlot, i) => {
    const { slot, upgrade } = upgradeSlot;

    return (
      <div className="upgrade-slot" key={i}>
        <button
          className="upgrade-slot-button"
          onClick={() => onSelect(upgradeSlot)}
        >
          <div className="button-icon">
            <XWingFont symbol={slot} type={FontType.slot} />
          </div>
          {upgrade ? (
            <UpgradeBase upgrade={upgrade} />
          ) : (
            <div className="button-name">{UpgradeSlotType[slot]}</div>
          )}
        </button>
      </div>
    );
  });
}

export default UpgradeSlots;
