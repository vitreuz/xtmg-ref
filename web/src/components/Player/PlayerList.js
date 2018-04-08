// @flow
import React from "react";
import PropTypes from "prop-types";

import Modal from "../Modal";

import NewPlayerForm from "./NewPlayerForm";

export default class PlayersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    this.setModalIsOpen = this.setModalIsOpen.bind(this);

    this.handleCancel = this.handleCancel.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.listPlayers = this.listPlayers.bind(this);
  }

  setModalIsOpen(bool) {
    this.setState({ modalIsOpen: bool });
  }

  handleCancel() {
    this.setModalIsOpen(false);
  }

  handleSubmit(body) {
    const { onNewPlayer } = this.props;
    onNewPlayer(body);

    this.setModalIsOpen(false);
  }

  handleClick() {
    this.setModalIsOpen(true);
  }

  listPlayers() {
    const { players } = this.props;
    if (!players) {
      return;
    }

    return players.map((player, i) => (
      <li className="players-list-item" key={i}>
        <Player {...player} />
      </li>
    ));
  }

  render() {
    const { onNewPlayer } = this.props;
    return (
      <div className="players-list">
        <ul className="players-list-list">
          {this.listPlayers()}
          <li className="players-list-item">
            <button className="new-player-button" onClick={this.handleClick}>
              New Player
            </button>
          </li>
        </ul>
        <Modal show={this.state.modalIsOpen}>
          <NewPlayerForm onCancel={this.handleCancel} onSubmit={onNewPlayer} />
        </Modal>
      </div>
    );
  }
}
PlayersList.propTypes = {
  onNewPlayer: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired
};

export class Player extends React.Component {
  render() {
    const {
      callsign,
      current_xp,
      name,
      pilot_skill,
      ships,
      upgrades
    } = this.props;
    console.log(this.props);

    return (
      <div className="player">
        <div className="player-name">Name: {name}</div>
        <div className="player-callsign">Callsign: {callsign}</div>
        <div className="player-pilot-skill">PS: {pilot_skill}</div>
        <div className="player-ships-count">Ship Count: {ships.length}</div>
        <div className="player-upgrade-count">
          Upgrade Count: {upgrades.length}
        </div>
        <div className="player-current-xp">Current XP: {current_xp}</div>
      </div>
    );
  }
}
Player.propTypes = {
  callsign: PropTypes.string.isRequired,
  current_xp: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  pilot_skill: PropTypes.number.isRequired,
  ships: PropTypes.array.isRequired,
  upgrades: PropTypes.array.isRequired
};
