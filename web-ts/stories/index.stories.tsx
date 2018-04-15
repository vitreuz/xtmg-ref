import * as React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ActionBar from '../src/components/action_bar';
import helpers from '../src/util/helpers';
import { Action } from '../src/client/Ship';
import UpgradeSlots from '../src/components/upgrade_slots';

const actions = [
  { action: Action.Focus },
  { action: Action.TargetLock },
  { action: Action.Boost, upgrade: helpers.upgrades.engineUpgrade }
];
storiesOf('Action Bar', module).add('as default', () => (
  <ActionBar actions={actions} />
));

storiesOf('Upgrade slots', module).add('as default', () => (
  <UpgradeSlots slots={helpers.players.leeroyjenkins.slots} />
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
