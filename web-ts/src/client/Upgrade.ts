export enum UpgradeSlotType {
  Astromech,
  Turret
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
