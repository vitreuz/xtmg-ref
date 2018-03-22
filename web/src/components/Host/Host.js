import React from "react";
import Games from "../Games";
import Client from "../../api/Client";

export default class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGame: null
    };

    Client.ListGames(games => this.setState({ games: games }), "select=active");
  }

  render() {
    return (
      <div className="host">
        {this.state.activeGame ? "Not Implemented" : <Games />}
      </div>
    );
  }
}
