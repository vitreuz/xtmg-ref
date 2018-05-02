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

  async FetchPlayer(player_id: string): Promise<Player> {
    const { client } = this.props;

    return client.FetchPlayer(player_id);
  }

  async UpdatePlayerSlots(
    player_id: string,
    upgrade_id: number,
    action: string
  ): Promise<void> {
    const { client } = this.props;

    const slot = action === 'add' ? { add: upgrade_id } : { rem: upgrade_id };
    const request = { slots: [slot] };
    return client.UpdatePlayer(player_id, request);
  }

  async UpdatePlayerHangarUpgrades(
    player_id: string,
    upgrade_id: number,
    action: string
  ): Promise<void> {
    const { client } = this.props;

    const slot = action === 'add' ? { add: upgrade_id } : { rem: upgrade_id };
    const request = { slots: [slot] };
    return client.UpdatePlayerHangar(player_id, request);
  }

  ListUpgradesByPlayer(player_id: string): Promise<Upgrade[]> {
    const { client } = this.props;

    return client.ListUpgrades({ player_id: player_id, owned: true });
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
