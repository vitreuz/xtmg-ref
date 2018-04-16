export enum UpgradeSlotType {
  Elite,
  Astromech,
  Torpedo,
  Missiles,
  Cannon,
  Turret,
  Bomb,
  Crew,
  SalvagedAstromech,
  System,
  Title,
  Missile,
  Modification,
  Illicit,
  Cargo,
  Hardpoint,
  Team,
  Tech
}

export interface Grant {
  type: string;
  name: string;
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
