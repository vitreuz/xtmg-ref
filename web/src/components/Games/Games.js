import React from "react";
import Client from "../../api/Client";

export default class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };

    Client.ListGames(games => this.setState({ games: games }));
  }

  listGames(games) {
    if (!games) {
      return;
    }
    return games.map(game => (
      <li className="game-item">
        <Game name={game.name} key={game.id} />
      </li>
    ));
  }

  render() {
    return (
      <ul className="games-list">
        {this.listGames(this.state.games)}
        <li className="game-item">
          <button className="game-new-button">+ New Game</button>
        </li>
      </ul>
    );
  }
}

function Game(props) {
  const { name } = props;

  return (
    <button className="game">
      <div className="game-name">{name}</div>
    </button>
  );
}
