import { Player } from '../client/Player';
import { Action, FiringArc, Ship, ShipSize } from '../client/Ship';
import { Upgrade, UpgradeSlotType } from '../client/Upgrade';

const xwing: Ship = {
  name: 'X-wing',
  faction: ['Rebel Alliance'],
  status: {
    attack: 3,
    agility: 2,
    hull: 3,
    shield: 2
  },
  actions: Action.parse(...['Focus', 'Target Lock']),
  maneuvers: [
    [0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 0, 0],
    [1, 1, 2, 1, 1, 0],
    [1, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 3]
  ],
  size: ShipSize['small'],
  xws: 'xwing',
  id: 0,
  firing_arcs: [FiringArc['Front']]
};

const ywing: Ship = {
  name: 'Y-wing',
  faction: ['Rebel Alliance', 'Scum and Villainy'],
  status: {
    attack: 2,
    agility: 1,
    hull: 5,
    shield: 3
  },
  actions: Action.parse(...['Focus', 'Target Lock']),
  maneuvers: [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 2, 1, 0, 0],
    [1, 1, 2, 1, 1, 0],
    [3, 1, 1, 1, 3, 0],
    [0, 0, 3, 0, 0, 3]
  ],
  size: ShipSize['small'],
  xws: 'ywing',
  id: 1,
  firing_arcs: [FiringArc['Front']]
};

const lambdaclassshuttle: Ship = {
  name: 'Lambda-class Shuttle',
  faction: ['Galactic Empire'],
  status: {
    attack: 3,
    agility: 1,
    hull: 5,
    shield: 5
  },
  actions: Action.parse(...['Focus', 'Target Lock']),
  maneuvers: [
    [0, 0, 3, 0, 0],
    [0, 2, 2, 2, 0],
    [3, 1, 2, 1, 3],
    [0, 3, 1, 3, 0]
  ],
  size: ShipSize['large'],
  xws: 'lambdaclassshuttle',
  id: 9,
  firing_arcs: [FiringArc['Front']]
};

const tieadvanced: Ship = {
  name: 'TIE Advanced',
  faction: ['Galactic Empire'],
  status: {
    attack: 2,
    agility: 3,
    hull: 3,
    shield: 2
  },
  actions: Action.parse(...['Focus', 'Target Lock', 'Barrel Roll', 'Evade']),
  maneuvers: [
    [0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 0],
    [1, 1, 2, 1, 1, 0],
    [1, 1, 2, 1, 1, 0],
    [0, 0, 1, 0, 0, 3],
    [0, 0, 1, 0, 0, 0]
  ],
  size: ShipSize['small'],
  xws: 'tieadvanced',
  id: 5,
  firing_arcs: [FiringArc['Front']]
};

const tiefighter: Ship = {
  name: 'TIE Fighter',
  faction: ['Galactic Empire', 'Rebel Alliance'],
  status: {
    attack: 2,
    agility: 3,
    hull: 3,
    shield: 0
  },
  actions: Action.parse(...['Focus', 'Barrel Roll', 'Evade']),
  maneuvers: [
    [0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0],
    [1, 2, 2, 2, 1, 0],
    [1, 1, 2, 1, 1, 3],
    [0, 0, 1, 0, 0, 3],
    [0, 0, 1, 0, 0, 0]
  ],
  size: ShipSize['small'],
  xws: 'tiefighter',
  id: 4,
  firing_arcs: [FiringArc['Front']]
};
const tiesilencer: Ship = {
  name: 'TIE Silencer',
  xws: 'tiesilencer',
  faction: ['First Order'],
  actions: [
    Action['Barrel Roll'],
    Action['Boost'],
    Action['Focus'],
    Action['Target Lock']
  ],
  size: ShipSize['small'],
  status: {
    attack: 3,
    agility: 3,
    hull: 4,
    shield: 2
  },
  firing_arcs: [FiringArc['Front']],
  id: 53,
  maneuvers: [
    [],
    [1, 0, 0, 0, 1],
    [2, 2, 2, 2, 2],
    [1, 2, 2, 2, 1, 0, 0, 0, 3, 3],
    [0, 0, 2, 0, 0, 3],
    [0, 0, 2]
  ]
};

const quadjumper: Ship = {
  name: 'Quadjumper',
  xws: 'quadjumper',
  faction: ['Scum and Villainy'],
  actions: Action.parse(...['Barrel Roll', 'Focus']),
  size: ShipSize['small'],
  status: {
    attack: 2,
    agility: 2,
    hull: 5,
    shield: 0
  },
  maneuvers: [
    [],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 3, 3, 3],
    [1, 2, 2, 2, 1, 0, 3, 3, 0],
    [0, 1, 2, 1]
  ],
  id: 43,
  firing_arcs: [FiringArc['Front']]
};
const ships = {
  xwing,
  ywing,
  lambdaclassshuttle,
  tieadvanced,
  tiefighter,
  tiesilencer,
  quadjumper
};

const blasterturret: Upgrade = {
  name: 'Blaster Turret',
  id: 37,
  slot: UpgradeSlotType['Turret'],
  points: 4,
  attack: 3,
  range: '1-2',
  text:
    '<strong>Attack (focus):</strong> Spend 1 focus token to perform this attack against 1 ship (even a ship outside your firing arc).',
  image: 'upgrades/Turret/blaster-turret.png',
  xws: 'blasterturrettoMatchElement'
};
const dorsalturret: Upgrade = {
  image: 'upgrades/Turret/dorsal-turret.png',
  text:
    '<strong>Attack:</strong> Attack 1 ship (even a ship outside your firing arc).<br /><br />If the target of this attack is at Range 1, roll 1 additional attack die.',
  name: 'Dorsal Turret',
  points: 3,
  slot: UpgradeSlotType['Turret'],
  attack: 2,
  range: '1-2',
  id: 212,
  xws: 'dorsalturret'
};
const engineUpgrade: Upgrade = {
  name: 'Engine Upgrade',
  id: 176,
  points: 4,
  slot: UpgradeSlotType['Modification'],
  text: 'Your action bar gains the [Boost] action icon.',
  image: 'upgrades/Modification/engine-upgrade.png',
  xws: 'engineupgrade',
  grants: [
    {
      type: 'action',
      name: 'Boost'
    }
  ]
};
const integratedastromech: Upgrade = {
  name: 'Integrated Astromech',
  id: 193,
  slot: UpgradeSlotType['Modification'],
  points: 0,
  ship: ['X-Wing', 'T-70 X-Wing'],
  text:
    'When you are dealt a Damage card, you may discard 1 of your [Astromech] Upgrade cards to discard that Damage card (without resolving its effect).',
  image: 'upgrades/Modification/integrated-astromech.png',
  xws: 'integratedastromech'
};
const ioncannonturret: Upgrade = {
  name: 'Ion Cannon Turret',
  id: 0,
  slot: UpgradeSlotType['Turret'],
  points: 5,
  attack: 4,
  range: '1-2',
  text:
    '<strong>Attack:</strong> Attack 1 ship (even a ship outside your firing arc).<br /><br />If this attack hits the target ship, the ship suffers 1 damage and receives 1 ion token.  Then cancel <strong>all</strong> dice results.',
  image: 'upgrades/Turret/ion-cannon-turret.png',
  xws: 'ioncannonturret'
};
const r2f2: Upgrade = {
  name: 'R2-F2',
  id: 4,
  unique: true,
  slot: UpgradeSlotType['Astromech'],
  points: 3,
  text:
    '<strong>Action:</strong> Increase your agility value by 1 until the end of this game round.',
  image: 'upgrades/Astromech/r2-f2.png',
  xws: 'r2f2'
};
const r2d2: Upgrade = {
  name: 'R2-D2',
  id: 3,
  unique: true,
  slot: UpgradeSlotType['Astromech'],
  points: 4,
  text:
    'After executing a green maneuver, you may recover 1 shield (up to your shield value).',
  image: 'upgrades/Astromech/r2-d2.png',
  xws: 'r2d2'
};
const r5astromech: Upgrade = {
  name: 'R5 Astromech',
  id: 7,
  slot: UpgradeSlotType['Astromech'],
  points: 1,
  text:
    'During the End phase, you may choose 1 of your faceup Damage cards with the <strong>Ship</strong> trait and flip it facedown.',
  image: 'upgrades/Astromech/r5-astromech.png',
  xws: 'r5astromech'
};
const stealthdevice: Upgrade = {
  name: 'Stealth Device',
  id: 174,
  points: 3,
  slot: UpgradeSlotType['Modification'],
  text:
    'Increase your agility value by 1. If you are hit by an attack, discard this card.',
  image: 'upgrades/Modification/stealth-device.png',
  xws: 'stealthdevice',
  grants: [
    {
      type: 'stats',
      name: 'agility',
      value: 1
    }
  ]
};
const wired: Upgrade = {
  name: 'Wired',
  id: 148,
  slot: UpgradeSlotType['Elite'],
  points: 1,
  text:
    'When attacking or defending, if you are stressed, you may reroll 1 or more of your [Focus] results.',
  image: 'upgrades/Elite/wired.png',
  xws: 'wired'
};
const heavyscykinterceptor: Upgrade = {
  name: '"Heavy Scyk" Interceptor',
  id: 165,
  slot: UpgradeSlotType['Title'],
  points: 2,
  ship: ['M3-A Interceptor'],
  text:
    'Your upgrade bar gains the [Cannon], [Torpedo] or [Missile] upgrade icon.',
  image: 'upgrades/Title/heavy-scyk-interceptor.png',
  xws: 'heavyscykinterceptor'
};

const upgrades = {
  blasterturret,
  dorsalturret,
  engineUpgrade,
  integratedastromech,
  ioncannonturret,
  heavyscykinterceptor,
  r2d2,
  r2f2,
  r5astromech,
  stealthdevice,
  wired
};

const leeroyjenkins: Player = {
  name: 'Leeroy Jenkins',
  callsign: 'LEEEEEEroy',
  pilot_skill: 5,
  current_xp: 4,

  ship: xwing,
  slots: [
    { slot: UpgradeSlotType.Torpedo },
    { slot: UpgradeSlotType.Astromech, upgrade: r2f2 },
    { slot: UpgradeSlotType.Title },
    { slot: UpgradeSlotType.Modification, upgrade: engineUpgrade },
    { slot: UpgradeSlotType.Modification, upgrade: integratedastromech },
    { slot: UpgradeSlotType.Elite, upgrade: wired },
    { slot: UpgradeSlotType.Elite }
  ],

  hangar: {
    ships: [xwing, ywing],
    upgrades: []
  }
};

const lukeskywalker: Player = {
  name: 'Luke Skywalker',
  callsign: 'Red Five',
  pilot_skill: 8,
  current_xp: 2,

  ship: xwing,
  slots: [
    { slot: UpgradeSlotType.Torpedo },
    { slot: UpgradeSlotType.Astromech, upgrade: r2d2 },
    { slot: UpgradeSlotType.Title },
    { slot: UpgradeSlotType.Modification },
    { slot: UpgradeSlotType.Modification },
    { slot: UpgradeSlotType.Elite },
    { slot: UpgradeSlotType.Elite }
  ],

  hangar: {
    ships: [xwing],
    upgrades: [r2d2, r5astromech, ioncannonturret, stealthdevice]
  }
};

const players = { leeroyjenkins, lukeskywalker };

const helpers = { ships, upgrades, players };
export default helpers;
