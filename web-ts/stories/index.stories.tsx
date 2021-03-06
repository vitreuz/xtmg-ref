import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Action, FiringArc } from '../src/client/Ship';
import { action } from '@storybook/addon-actions';
import ActionBar from '../src/components/action_bar';
import ManeuverCard from '../src/components/maneuver_card';
import PlayerCard from '../src/components/player_card';
import PlayerMenu from '../src/components/player_menu';
import PlayersList from '../src/components/players_list';
import StatusBar from '../src/components/status_bar';
import UpgradeSlots from '../src/components/upgrade_slots';
import helpers from '../src/util/helpers';
import PlayerForm from '../src/components/player_form';

const actions = [
  { action: Action.Focus },
  { action: Action.TargetLock },
  { action: Action.Boost, upgrade: helpers.upgrades.engineUpgrade }
];
storiesOf('Action Bar', module).add('as default', () => (
  <ActionBar actions={actions} />
));

storiesOf('Status Bar', module)
  .add('as default', () => <StatusBar base={helpers.ships.xwing.status} />)
  .add('with damage', () => (
    <StatusBar
      base={helpers.ships.xwing.status}
      live={{ attack: 0, agility: 1, hull: -1, shield: -2 }}
    />
  ))
  .add('with non-standard arc', () => (
    <StatusBar
      base={helpers.ships.xwing.status}
      firing_arc={FiringArc.AuxiliaryRear}
    />
  ));

storiesOf('Maneuver Card', module)
  .add('X-Wing maneuvers', () => (
    <ManeuverCard maneuvers={helpers.ships.xwing.maneuvers} />
  ))
  .add('Lambda Shuttle maneuvers', () => (
    <ManeuverCard maneuvers={helpers.ships.lambdaclassshuttle.maneuvers} />
  ))
  .add('Quad Jumper maneuvers', () => (
    <ManeuverCard maneuvers={helpers.ships.quadjumper.maneuvers} />
  ))
  .add('Tie Silencer maneuvers', () => (
    <ManeuverCard maneuvers={helpers.ships.tiesilencer.maneuvers} />
  ));

storiesOf('Upgrade slots', module).add('as default', () => (
  <UpgradeSlots
    slots={helpers.players.leeroyjenkins.slots}
    onSelect={action('clicked')}
  />
));

storiesOf('Player Card', module).add('Leeroy', () => (
  <PlayerCard
    player={helpers.players.leeroyjenkins}
    onSelectUpgrade={action('clicked')}
  />
));

storiesOf('Full List', module).add('Luke and Leeroy', () => (
  <PlayersList
    players={[helpers.players.leeroyjenkins, helpers.players.lukeskywalker]}
    NewPlayer={action('new')}
    SelectPlayer={action('select')}
  />
));

const starterShips = [helpers.ships.xwing, helpers.ships.ywing];
storiesOf('Player Form', module).add('new form', () => (
  <PlayerForm
    starterShips={starterShips}
    CreatePlayer={req => {
      action('submit')(req);
      return new Promise(resolve => resolve('some-player-id'));
    }}
    CancelForm={action('cancel')}
    SelectPlayer={action('select')}
  />
));

storiesOf('Player Menu', module).add('Leeroy', () => (
  <PlayerMenu
    player={helpers.players.lukeskywalker}
    EquipUpgrade={action('equip')}
    UnequipUpgrade={action('unequip')}
    PurchaseUpgrade={action('purchase')}
    upgrades={[
      helpers.upgrades.engineUpgrade,
      helpers.upgrades.integratedastromech,
      helpers.upgrades.r2f2,
      helpers.upgrades.wired
    ]}
  />
));
// storiesOf('Welcome', module).add('to Storybook', () => (
//   <Welcome showApp={linkTo('Button')} />
// ));

// storiesOf('Button', module)
//   .add('with text', () => (
//     <Button onClick={action('clicked')}>Hello Button</Button>
//   ))
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ));
