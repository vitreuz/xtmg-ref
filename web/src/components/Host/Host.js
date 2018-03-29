import React from "react";
import Games from "../Games";
import Client from "../../api/Client";

export default class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGame: null,

      games: []
    };

    this.setActiveGame = this.setActiveGame.bind(this);
    this.setGames = this.setGames.bind(this);

    this.createGame = this.createGame.bind(this);
    this.fetchActiveGame = this.fetchActiveGame.bind(this);
    this.deactivateGame = this.deactivateGame.bind(this);
    this.listGames = this.listGames.bind(this);
    this.updateGame = this.updateGame.bind(this);
  }

  setGames(games) {
    this.setState({ games: games });
  }

  setActiveGame(game) {
    this.setState({ activeGame: game });
  }

  unsetActiveGame() {
    this.setState({ activeGame: null });
  }

  createGame(body) {
    return Client.CreateGame(body, this.listGames);
  }

  fetchActiveGame() {
    Client.ListGames(
      games => this.setActiveGame(games ? games[0] : null),
      "select=active"
    );
  }

  listGames() {
    Client.ListGames(this.setGames);
  }

  updateGame(id, body) {
    return Client.UpdateGame(id, body, this.listGames);
  }

  deactivateGame() {
    Client.UpdateGame(this.state.activeGame.id, { is_active: false });
    this.unsetActiveGame();
  }

  componentDidMount() {
    this.fetchActiveGame();

    this.listGames();
  }

  render() {
    return (
      <div className="host">
        {this.state.activeGame ? (
          <ActiveGame
            onDeactivate={this.deactivateGame}
            game={this.state.activeGame}
          />
        ) : (
          <Games
            onActivate={this.setActiveGame}
            onNewGame={this.createGame}
            games={this.state.games}
          />
        )}
      </div>
    );
  }
}

class ActiveGame extends React.Component {
  render() {
    const { game } = this.props;
    const { onDeactivate } = this.props;
    return (
      <div className="active-game-lobby">
        {game.name}
        <button onClick={onDeactivate}>Exit</button>
      </div>
    );
  }
}
