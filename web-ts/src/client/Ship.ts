export enum Action {
  BarrelRoll,
  Boost,
  Cloak,
  Coordinate,
  Focus,
  Jam,
  Recover,
  Reinforce,
  Reload,
  RotateArc,
  SLAM,
  TargetLock
}

export enum Bearing {
  LeftTurn,
  LeftBank,
  Straight,
  RightBank,
  RightTurn,
  KTurn,
  SLoopLeft,
  SLoopRight,
  TRollLeft,
  TRollRight,
  ReverseBankLeft,
  ReverseStraight,
  ReverseBankRight
}

export enum FiringArc {
  Front,
  Turret
}

export enum Maneuver {
  none,
  white,
  green,
  red
}

export enum ShipSize {
  small,
  large,
  huge
}

export interface Ship {
  id: number;

  name: string;
  agility: number;
  attack: number;
  hull: number;
  shields: number;
  firing_arcs: FiringArc[];

  actions: Action[];
  maneuvers: Maneuver[][];

  faction: string[];
  size: ShipSize;
  xws: string;
}
