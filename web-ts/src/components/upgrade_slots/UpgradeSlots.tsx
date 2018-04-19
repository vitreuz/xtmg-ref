import * as React from 'react';
import { UpgradeSlot, UpgradeSlotType } from '../../client/Upgrade';
import UpgradeBase from '../upgrade_base';
import { FontType } from '../xwing_font/XWingFont';
import XWingFont from '../xwing_font/index';

export interface UpgradeSlotsProps {
  slots: UpgradeSlot[];
}

function UpgradeSlots({ slots }: UpgradeSlotsProps) {
  return (
    <div className="upgrade-slots">
      <div className="upgrade-slots-list">{listSlots(slots)}</div>
    </div>
  );
}

export default UpgradeSlots;

function listSlots(slots: UpgradeSlot[]) {
  return slots.map(({ slot, upgrade }: UpgradeSlot, i) => (
    <div className="upgrade-slot" key={i}>
      <button className="upgrade-slot-button">
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
  ));
}
