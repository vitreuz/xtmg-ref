export enum UpgradeSlotType {
  Elite = 'Elite',
  Astromech = 'Astromech',
  Torpedo = 'Torpedo',
  Missile = 'Missile',
  Cannon = 'Cannon',
  Turret = 'Turret',
  Bomb = 'Bomb',
  Crew = 'Crew',
  SalvagedAstromech = 'Salvaged Astromech',
  System = 'System',
  Title = 'Title',
  Modification = 'Modification',
  Illicit = 'Illicit',
  Cargo = 'Cargo',
  Hardpoint = 'Hardpoint',
  Team = 'Team',
  Tech = 'Tech'
}

export namespace UpgradeSlotType {
  export function parse(...slots: string[]): UpgradeSlotType[] {
    return slots.map(slot => UpgradeSlotType[slot.replace(' ', '')]);
  }
}

export interface Grant {
  type: string;
  name: string;
  value?: number;
}

export interface Upgrade {
  id: number;
  name: string;
  xws: string;
  image: string;
  unique?: boolean;
  text: string;
  points: number;
  slot: UpgradeSlotType;
  attack?: number;
  range?: string;
  ship?: string[];
  grants?: Grant[];
}

export interface UpgradeSlot {
  slot: UpgradeSlotType;
  upgrade?: Upgrade;
}
