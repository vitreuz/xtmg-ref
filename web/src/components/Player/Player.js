import React from "react";
import PropTypes from "prop-types";
import Client from "../../api/Client";
import Modal from "../Modal";

import NewPlayerForm from "./NewPlayerForm";

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGame: null,

      activePlayer: null
    };

    this.setActiveGame = this.setActiveGame.bind(this);
    this.setActivePlayer = this.setActivePlayer.bind(this);

    this.fetchActiveGame = this.fetchActiveGame.bind(this);
    this.createPlayer = this.createPlayer.bind(this);
  }

  setActiveGame(game) {
    this.setState({ activeGame: game });
  }

  setActivePlayer(player) {
    this.setState({ activePlayer: player });
  }

  fetchActiveGame() {
    Client.ListGames(
      games => this.setActiveGame(games ? games[0] : null),
      "select=active"
    );
  }

  createPlayer(body) {
    const { id } = this.state.activeGame;
    Client.CreatePlayer(id, body);
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
          <PlayerGame
            game={this.state.activeGame}
            onSubmit={this.createPlayer}
          />
        ) : (
          <div className="no-active-game">There is no current active game</div>
        )}
      </div>
    );
  }
}

class PlayerGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPlayerFormIsOpen: false
    };

    this.togglePlayerForm = this.togglePlayerForm.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  togglePlayerForm() {
    this.setState({ newPlayerFormIsOpen: !this.state.newPlayerFormIsOpen });
  }

  handleSubmit(body) {
    const { onSubmit } = this.props;

    onSubmit(body);
    this.togglePlayerForm();
  }

  render() {
    const { game } = this.props;
    return (
      <div className="player-game">
        Active Game: <strong className="game-name">{game.name}</strong>
        <button onClick={this.togglePlayerForm}>New Player</button>
        <Modal show={this.state.newPlayerFormIsOpen}>
          <NewPlayerForm
            onSubmit={this.handleSubmit}
            onCancel={this.togglePlayerForm}
          />
        </Modal>
      </div>
    );
  }
}
PlayerGame.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
