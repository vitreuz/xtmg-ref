import * as React from 'react';
import { Player } from 'client/Player';
import { Upgrade } from 'client/Upgrade';
import { Ship } from 'client/Ship';
import PlayersList from '../players_list';
import PlayerMenu from '../player_menu/index';
import PlayerForm from '../player_form/index';

interface PLProps {
  starterShips: Ship[];
}

interface PLState {
  chosenPlayer?: Player;
  isCreateOpen: boolean;
  players: Player[];
  upgrades: Upgrade[];
}

class PlayerLobby extends React.Component<PLProps, PLState> {
  constructor(props: PLProps) {
    super(props);

    this.state = {
      isCreateOpen: false,
      players: [],
      upgrades: []
    };
  }

  startNewPlayer() {}

  render() {
    return (
      <div className="player-lobby">{renderLobby(this.props, this.state)}</div>
    );
  }
}

function renderLobby(props: PLProps, state: PLState): JSX.Element {
  const { chosenPlayer, isCreateOpen, players, upgrades } = state;
  const { starterShips } = props;

  if (!!chosenPlayer) {
    return (
      <PlayerMenu
        player={chosenPlayer}
        upgrades={upgrades}
        EquipUpgrade={() => {}}
        PurchaseUpgrade={() => {}}
        UnequipUpgrade={() => {}}
      />
    );
  }
  if (isCreateOpen) {
    return (
      <PlayerForm
        starterShips={starterShips}
        CreatePlayer={() => {}}
        CancelForm={() => {}}
      />
    );
  }
  return (
    <PlayersList
      players={players}
      NewPlayer={() => {}}
      SelectPlayer={() => {}}
    />
  );
}

export default PlayerLobby;
