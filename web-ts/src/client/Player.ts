import { Action, Ship, Status } from './Ship';
import { Upgrade, UpgradeSlot } from './Upgrade';

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
  modified_status?: Status;
  live_status?: Status;
}

export interface Player {
  id: string;
  name: string;
  callsign: string;
  pilot_skill: number;
  current_xp: number;

  ship: Ship;
  slots: UpgradeSlot[];

  hangar: Hangar;

  modifiers?: Modifiers;
}
