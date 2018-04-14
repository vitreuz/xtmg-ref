import { Ship, FiringArc, Action, ShipSize } from '../client/Ship';
import { Upgrade, UpgradeSlotType } from '../client/Upgrade';

const xwing: Ship = {
  name: 'X-wing',
  faction: ['Rebel Alliance'],
  attack: 3,
  agility: 2,
  hull: 3,
  shields: 2,
  actions: [Action['Focus'], Action['Target Lock']],
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
  attack: 2,
  agility: 1,
  hull: 5,
  shields: 3,
  actions: [Action['Focus'], Action['Target Lock']],
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

const tieadvanced: Ship = {
  name: 'TIE Advanced',
  faction: ['Galactic Empire'],
  attack: 2,
  agility: 3,
  hull: 3,
  shields: 2,
  actions: [
    Action['Focus'],
    Action['Target Lock'],
    Action['Barrel Roll'],
    Action['Evade']
  ],
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
  attack: 2,
  agility: 3,
  hull: 3,
  shields: 0,
  actions: [Action['Focus'], Action['Barrel Roll'], Action['Evade']],
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

const ships = { xwing, ywing, tieadvanced, tiefighter };

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
const upgrades = { engineUpgrade };

const helpers = { ships, upgrades };
export default helpers;
