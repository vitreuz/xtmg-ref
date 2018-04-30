export enum Action {
  BarrelRoll = 'Barrel Roll',
  Boost = 'Boost',
  Cloak = 'Cloak',
  Coordinate = 'Coordinate',
  Evade = 'Evade',
  Focus = 'Focus',
  Jam = 'Jam',
  Recover = 'Recover',
  Reinforce = 'Reinforce',
  Reload = 'Reload',
  RotateArc = 'Rotate Arc',
  SLAM = 'SLAM',
  TargetLock = 'Target Lock'
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
  Auxiliary180 = 'Auxiliary 180',
  AuxiliaryRear = 'Auxiliary Rear',
  Bullseye = 'Bullseye',
  Front = 'Front',
  Turret = 'Turret'
}

export enum Maneuver {
  none,
  white,
  green,
  red
}

export enum ShipSize {
  small = 'small',
  large = 'large',
  huge = 'huge'
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
