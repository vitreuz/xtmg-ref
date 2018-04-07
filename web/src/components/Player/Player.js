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

      players: [],
      activePlayer: null
    };

    this.setActiveGame = this.setActiveGame.bind(this);
    this.setActivePlayer = this.setActivePlayer.bind(this);
    this.setPlayers = this.setPlayers.bind(this);

    this.listPlayers = this.listPlayers.bind(this);
    this.createPlayer = this.createPlayer.bind(this);
  }

  setActiveGame(game) {
    this.setState({ activeGame: game });

    this.listPlayers();
  }

  setActivePlayer(player) {
    this.setState({ activePlayer: player });
  }

  setPlayers(players) {
    this.setState({ players: players });
  }

  listPlayers() {
    const { activeGame } = this.state;
    if (!activeGame) {
      return;
    }
    Client.ListPlayers(activeGame.id).then(this.setPlayers);
  }

  createPlayer(body) {
    const { id } = this.state.activeGame;
    Client.CreatePlayer(id, body).then(this.setActivePlayer);
  }

  *pollForActivity() {
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
    this.poll(this.pollForActivity());
  }

  render() {
    return (
      <div className="player">
        {this.state.activeGame ? (
          <PlayerGame
            game={this.state.activeGame}
            players={this.state.players}
            activePlayer={this.state.activePlayer}
            onSubmit={this.createPlayer}
            onChoose={this.setActivePlayer}
          />
        ) : (
          <div className="no-active-game">There is no current active game</div>
        )}
      </div>
    );
  }
}

class PlayerGame extends React.Component {
  render() {
    const { game, activePlayer, players } = this.props;
    const { onChoose, onSubmit } = this.props;

    return (
      <div className="player-game">
        Active Game: <strong className="game-name">{game.name}</strong>
        {activePlayer ? (
          <PlayerLobby player={activePlayer} />
        ) : (
          <PlayerList
            onChoose={onChoose}
            onSubmit={onSubmit}
            players={players}
          />
        )}
      </div>
    );
  }
}
PlayerGame.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChoose: PropTypes.func.isRequired
};

class PlayerLobby extends React.Component {
  render() {
    const { player } = this.props;
    return <div className="player-lobby">{player.name}</div>;
  }
}

class PlayerList extends React.Component {
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

  listPlayers() {
    const { players, onChoose } = this.props;

    if (!players) {
      return;
    }
    return players.map((player, i) => (
      <li className="player-item" key={i}>
        <PlayerItem player={player} onChoose={onChoose} />
      </li>
    ));
  }

  render() {
    return (
      <div className="players">
        <ul className="players-list">
          {this.listPlayers()}
          <li className="player-item">
            <button onClick={this.togglePlayerForm}>New Player</button>
          </li>
        </ul>
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
PlayerList.propTypes = {
  onChoose: PropTypes.func.isRequired
};

class PlayerItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleChoose = this.handleChoose.bind(this);
  }

  handleChoose(player) {
    const { onChoose } = this.props;
    onChoose(player);
  }

  render() {
    const { player } = this.props;
    return (
      <div className="player-item">
        <div className="name">Name: {player.name}</div>
        <div className="callsign">Callsign: {player.callsign}</div>
        <div className="pilot-skill">PS: {player.pilot_skill}</div>
        <div className="ships">Ships: {player.ships.length}</div>
        <div className="upgrades">
          Upgrades: {player.upgrades ? player.upgrades.length : 0}
        </div>
        <button onClick={this.handleChoose(player)}>Choose</button>
      </div>
    );
  }
}
