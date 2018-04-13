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

export enum Maneuver {
  none,
  white,
  green,
  red
}

export interface Ship {
  agility: number;
  attack: number;
  hull: number;
  shield: number;

  maneuvers: Maneuver[][];
}
