export enum Action {
  BarrelRoll,
  Boost,
  Cloak,
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

export enum Bearing {
  TurnLeft,
  BankLeft,
  Straight,
  BankRight,
  TurnRight,
  KTurn,
  SLoopLeft,
  SLoopRight,
  TRollLeft,
  TRollRight,
  ReverseBankLeft,
  ReverseStraight,
  ReverseBankRight,
  Stop
}

export enum FiringArc {
  Auxiliary180,
  AuxiliaryRear,
  Bullseye,

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

export enum ShipStat {
  Attack,
  Agility,
  Hull,
  Shield
}

export interface Status {
  agility: number;
  attack: number;
  hull: number;
  shield: number;
}

export interface Ship {
  id: number;

  name: string;
  status: Status;
  firing_arcs: FiringArc[];

  actions: Action[];
  maneuvers: Maneuver[][];

  faction: string[];
  size: ShipSize;
  xws: string;
}
