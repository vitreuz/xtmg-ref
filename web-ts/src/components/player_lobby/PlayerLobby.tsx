import * as React from 'react';
import { Player } from 'client/Player';
import { Upgrade } from 'client/Upgrade';
import PlayersList from '../players_list';
import PlayerMenu from '../player_menu/index';
import PlayerForm from '../player_form/index';

interface PLProps {}

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
    return <div className="player-lobby">{renderLobby(this.state)}</div>;
  }
}

function renderLobby(state: PLState): JSX.Element {
  const { chosenPlayer, isCreateOpen, players, upgrades } = state;

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
    return <PlayerForm />;
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
