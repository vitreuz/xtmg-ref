import { Upgrade, UpgradeSlotType, UpgradeSlot } from './Upgrade';
import { Ship } from './Ship';

export interface Hangar {
  ship: Ship[];
  upgrades: Upgrade[];
}

export interface Pilot {
  name: string;
  callsign: string;
  pilot_skill: string;
  current_xp: number;

  ship: Ship;
  slots: UpgradeSlot[];

  hangar: Hangar;
}
