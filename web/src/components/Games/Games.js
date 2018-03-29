import React from "react";
import Client from "../../api/Client";
import Modal from "../Modal";

export default class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createGameDialog: false,
      createGameName: ""
    };

    this.createGame = this.createGame.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleCreateGame = this.toggleCreateGame.bind(this);
  }

  listGames(games) {
    if (!games) {
      return;
    }
    return games.map((game, i) => (
      <li className="game-item" key={i}>
        <Game
          name={game.name}
          id={game.id}
          onActivate={this.props.onActivate}
        />
      </li>
    ));
  }

  handleInputChange(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  }

  toggleCreateGame() {
    this.setState({
      createGameDialog: !this.state.createGameDialog,
      createGameName: ""
    });
  }

  createGame() {
    let body = { name: this.state.createGameName };
    this.props.onNewGame(body);

    this.toggleCreateGame();
  }

  newGame(callback) {
    const body = { name: this.state.createGameName };
    callback(body);
  }

  render() {
    const { games } = this.props;

    return (
      <div className="games">
        <ul className="games-list">
          {this.listGames(games)}
          <li className="game-item">
            <button className="game-new-button" onClick={this.toggleCreateGame}>
              New Game
            </button>
          </li>
        </ul>

        <Modal
          buttons={
            <div className="game-create-button">
              <button onClick={this.createGame}>Create</button>
              <button onClick={this.toggleCreateGame}>Cancel</button>
            </div>
          }
          show={this.state.createGameDialog}
        >
          <form className="game-create-form" onSubmit={e => e.preventDefault()}>
            Name:
            <input
              type="text"
              name="createGameName"
              value={this.state.createGameName}
              onChange={this.handleInputChange}
            />
          </form>
        </Modal>
      </div>
    );
  }
}

class Game extends React.Component {
  activateGame(id) {
    Client.UpdateGame(id, { is_active: true }, game =>
      this.props.onActivate(game)
    );
  }

  render() {
    const { id, name } = this.props;

    return (
      <div className="game">
        <div className="game-name">{name}</div>
        <button
          onClick={() => {
            if (window.confirm(`Activate ${this.props.name}?`)) {
              this.activateGame(id);
            }
          }}
        >
          Continue
        </button>
      </div>
    );
  }
}
