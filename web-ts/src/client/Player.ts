import { Upgrade, UpgradeSlotType, UpgradeSlot } from './Upgrade';
import { Ship } from './Ship';

export interface Hangar {
  ships: Ship[];
  upgrades: Upgrade[];
}

export interface Player {
  name: string;
  callsign: string;
  pilot_skill: number;
  current_xp: number;

  ship: Ship;
  slots: UpgradeSlot[];

  hangar: Hangar;
}
