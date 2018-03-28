import React from "react";
import Games from "../Games";
import Client from "../../api/Client";

export default class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGame: null
    };

    this.setActiveGame = this.setActiveGame.bind(this);
  }

  componentDidMount() {
    Client.ListGames(games => {
      games ? this.setState({ activeGame: games[0] }) : null;
    }, "select=active");
  }

  setActiveGame(game) {
    this.setState({ activeGame: game });
  }

  disactivateGame() {
    Client.UpdateGame(this.state.activeGame.id, { is_active: false });
    this.setState({ activeGame: null });
  }

  render() {
    return (
      <div className="host">
        {this.state.activeGame ? (
          <div>
            Active game {this.state.activeGame.name}
            <button
              onClick={() => {
                if (
                  window.confirm(
                    `Really disactivate ${this.state.activeGame.name}?`
                  )
                ) {
                  this.disactivateGame();
                }
              }}
            >
              Disactivate
            </button>
          </div>
        ) : (
          <Games onActivate={this.setActiveGame} />
        )}
      </div>
    );
  }
}
