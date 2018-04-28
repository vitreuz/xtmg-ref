export enum UpgradeSlotType {
  Elite,
  Astromech,
  Torpedo,
  Missiles,
  Cannon,
  Turret,
  Bomb,
  Crew,
  System,
  Title,
  Missile,
  Modification,
  Illicit,
  Cargo,
  Hardpoint,
  Team,
  Tech,
  SalvagedAstromech = 'Salvaged Astromech'
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
