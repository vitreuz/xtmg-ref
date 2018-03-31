import React from "react";
import Client from "../../api/Client";

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGame: null,

      activePlayer: null
    };

    this.setActiveGame = this.setActiveGame.bind(this);

    this.fetchActiveGame = this.fetchActiveGame.bind(this);
  }

  setActiveGame(game) {
    this.setState({ activeGame: game });
  }

  fetchActiveGame() {
    Client.ListGames(
      games => this.setActiveGame(games ? games[0] : null),
      "select=active"
    );
  }

  *pollForActiveGame() {
    while (!this.state.activeGame) {
      yield Client.ListGames;
    }
  }

  async poll(iter) {
    const next = iter.next();
    if (next.done) return;
    const fn = next.value;

    fn(data => this.setActiveGame(data ? data[0] : null), "select=active");
    await new Promise(resolve => setTimeout(resolve, 3000));
    this.poll(iter);
  }

  componentDidMount() {
    this.poll(this.pollForActiveGame());
  }

  render() {
    return (
      <div className="player">
        {this.state.activeGame ? (
          <div className="player-game" />
        ) : (
          <div className="no-active-game">There is no current active game</div>
        )}
      </div>
    );
  }
}
