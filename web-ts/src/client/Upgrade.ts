export enum UpgradeSlotType {
  Elite,
  Astromech,
  Torpedos,
  Missiles,
  Cannon,
  Turret,
  Bomb,
  Crew,
  SalvagedAstromech,
  System,
  Title,
  Modification,
  Illicit,
  Cargo,
  Hardpoint,
  Team,
  Tech
}

export interface Upgrade {
  id: number;
  name: string;
  xws: string;
  image: string;
  text: string;
  points: number;
  slot: UpgradeSlotType;
  attack?: number;
  range?: string;
}

export interface UpgradeSlot {
  slot: UpgradeSlotType;
  upgrade?: Upgrade;
}
