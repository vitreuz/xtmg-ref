import * as React from 'react';
import { Player } from '../../client/Player';
import PlayerCard from '../player_card';
import PlayersList from '../players_list';

interface PLProps {}

interface PLState {
  chosenPlayer?: Player;
  players: Player[];
}
class PlayerLobby extends React.Component<PLProps, PLState> {
  constructor(props: PLProps) {
    super(props);

    this.state = {
      players: []
    };
  }

  startNewPlayer() {}

  render() {
    const { chosenPlayer, players } = this.state;
    return (
      <div className="player-lobby">
        {chosenPlayer ? (
          <PlayerCard player={chosenPlayer} />
        ) : (
          <PlayersList players={players} />
        )}
      </div>
    );
  }
}

export default PlayerLobby;
