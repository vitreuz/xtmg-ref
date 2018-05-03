import * as React from 'react';
import PlayerLobby from './player_lobby/PlayerLobby';
import { Config } from 'client/Config';
import {
  CreatePlayerReq,
  UpgradesQuery,
  UpdatePlayerReq
} from '../client/Client';
import { Player } from '../client/Player';
import { Upgrade } from '../client/Upgrade';

interface AppClient {
  FetchConfig: () => Promise<Config>;
  CreatePlayer: (body: CreatePlayerReq) => Promise<string>;
  ListPlayers: () => Promise<Player[]>;
  FetchPlayer: (id: string) => Promise<Player>;
  UpdatePlayer: (id: string, request: UpdatePlayerReq) => Promise<void>;
  UpdatePlayerHangar: (id: string, request: UpdatePlayerReq) => Promise<void>;
  ListUpgrades: (query: UpgradesQuery) => Promise<Upgrade[]>;
}

interface AProps {
  client: AppClient;
}

interface AState {
  config?: Config;
  players?: Player[];
}

class App extends React.Component<AProps, AState> {
  constructor(props: AProps) {
    super(props);

    this.state = {};

    this.CreatePlayer = this.CreatePlayer.bind(this);
    this.FetchPlayer = this.FetchPlayer.bind(this);
    this.UpdatePlayerSlots = this.UpdatePlayerSlots.bind(this);
    this.UpdatePlayerHangarUpgrades = this.UpdatePlayerHangarUpgrades.bind(
      this
    );
    this.ListUpgradesByPlayer = this.ListUpgradesByPlayer.bind(this);
  }
  async FetchConfig() {
    const { client } = this.props;

    const config = await client.FetchConfig();
    this.setState({ config: config });
  }

  CreatePlayer(player: CreatePlayerReq): Promise<string> {
    const { client } = this.props;

    return client.CreatePlayer(player);
  }

  async ListPlayers() {
    const { client } = this.props;

    const players = await client.ListPlayers();
    this.setState({ players: players });
  }

  async FetchPlayer(playerID: string): Promise<Player> {
    const { client } = this.props;

    return client.FetchPlayer(playerID);
  }

  async UpdatePlayerSlots(
    playerID: string,
    upgradeID: number,
    action: string
  ): Promise<void> {
    const { client } = this.props;

    const slot = action === 'add' ? { add: upgradeID } : { rem: upgradeID };
    const request = { slots: [slot] };
    return client.UpdatePlayer(playerID, request);
  }

  async UpdatePlayerHangarUpgrades(
    playerID: string,
    upgradeID: number,
    action: string
  ): Promise<void> {
    const { client } = this.props;

    const slot = action === 'add' ? { add: upgradeID } : { rem: upgradeID };
    const request = { slots: [slot] };
    return client.UpdatePlayerHangar(playerID, request);
  }

  ListUpgradesByPlayer(playerID: string): Promise<Upgrade[]> {
    const { client } = this.props;

    return client.ListUpgrades({ player_id: playerID, owned: true });
  }

  componentDidMount() {
    this.FetchConfig();
  }

  render() {
    const { config, players } = this.state;

    return (
      <div className="app">
        {!!config && !!players ? (
          <PlayerLobby
            starterShips={config.starter_ships}
            players={players}
            CreatePlayer={this.CreatePlayer}
            FetchPlayer={this.FetchPlayer}
            UpdatePlayerSlots={this.UpdatePlayerSlots}
            UpdatePlayerHangarUpgrades={this.UpdatePlayerHangarUpgrades}
            ListUpgradesByPlayer={this.ListUpgradesByPlayer}
          />
        ) : (
          <div className="app-loading">LOADING...</div>
        )}
      </div>
    );
  }
}

export default App;
