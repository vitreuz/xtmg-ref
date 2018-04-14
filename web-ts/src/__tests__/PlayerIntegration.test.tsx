import * as React from 'react';
import { render } from 'enzyme';

import { Hangar, Player } from '../client/Player';
import { UpgradeSlotType } from '../client/Upgrade';

import PlayerCard from '../components/player_card';
import helpers from '../util/helpers';

const LukesHangar: Hangar = {
  ships: [helpers.ships.xwing, helpers.ships.ywing],
  upgrades: []
};

const LukeSkywalker: Player = {
  name: 'Luke Skywalker',
  callsign: 'Rogue Leader',
  pilot_skill: 8,
  current_xp: 12,

  ship: helpers.ships.xwing,
  slots: [
    { slot: UpgradeSlotType.Astromech },
    { slot: UpgradeSlotType.Torpedos },
    { slot: UpgradeSlotType.Astromech },
    { slot: UpgradeSlotType.Title },
    { slot: UpgradeSlotType.Modification },
    { slot: UpgradeSlotType.Modification },
    { slot: UpgradeSlotType.Modification },
    { slot: UpgradeSlotType.Modification },
    { slot: UpgradeSlotType.Elite },
    { slot: UpgradeSlotType.Elite },
    { slot: UpgradeSlotType.Elite }
  ],
  hangar: LukesHangar
};

describe('Player', () => {
  describe('render', () => {
    describe('when Luke is the set pilot', () => {
      it('renders Lukes ship', () => {
        const wrapper = render(<PlayerCard player={LukeSkywalker} />);
      });
    });
  });
});
