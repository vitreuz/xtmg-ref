import { Upgrade, UpgradeSlot } from './Upgrade';
import { Ship, Action } from './Ship';

export interface Hangar {
  ships: Ship[];
  upgrades: Upgrade[];
}

export interface UpgradeAction {
  action: Action;
  upgrade: Upgrade;
}

export interface Modifiers {
  upgrade_actions?: UpgradeAction[];
}

export interface Player {
  name: string;
  callsign: string;
  pilot_skill: number;
  current_xp: number;

  ship: Ship;
  slots: UpgradeSlot[];

  hangar: Hangar;

  modifiers?: Modifiers;
}
