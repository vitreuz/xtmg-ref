export enum UpgradeSlot {
  BarrelRoll,
  Boost,
  CloakDecloak,
  Coordinate,
  Evade,
  Focus,
  Jam,
  Recover,
  Reinforce,
  Reload,
  RotateArc,
  SLAM,
  TargetLock
}

export interface Upgrade {
  id: number;
  name: string;
  xws: string;
  image: string;
  text: string;
  points: number;
  slot: keyof typeof UpgradeSlot;
  attack?: number;
  range?: string;
}
