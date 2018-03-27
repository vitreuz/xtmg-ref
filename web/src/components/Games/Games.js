import React from "react";
import Client from "../../api/Client";
import Modal from "../Modal";

export default class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      createGameDialog: false,

      createGameName: ""
    };

    Client.ListGames(games => this.setState({ games: games }));

    this.createGame = this.createGame.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleCreateGame = this.toggleCreateGame.bind(this);
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
    Client.CreateGame({ name: this.state.createGameName }, game =>
      alert(game.name)
    );
    Client.ListGames(games => this.setState({ games: games }));

    this.toggleCreateGame();
  }

  render() {
    return (
      <div className="games">
        <ul className="games-list">
          {this.listGames(this.state.games)}
          <li className="game-item">
            <button className="game-new-button" onClick={this.toggleCreateGame}>
              + New Game
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

function Game(props) {
  const { name } = props;

  return (
    <button className="game">
      <div className="game-name">{name}</div>
    </button>
  );
}
