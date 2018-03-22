import React from "react";
import Host from "../Host";
import Player from "../Player";

export default class App extends React.Component {
  render() {
    let url = new URL(document.URL);
    return (
      <div className="app">
        {url.pathname === "/host" ? <Host /> : <Player />}
      </div>
    );
  }
}
