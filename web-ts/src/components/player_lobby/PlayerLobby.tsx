import { CreatePlayerReq } from 'client/Client';
import { Player } from 'client/Player';
import { Ship } from 'client/Ship';
import { Upgrade } from 'client/Upgrade';
import * as React from 'react';
import PlayerForm from '../player_form/index';
import PlayerMenu from '../player_menu/index';
import PlayersList from '../players_list';

interface PLProps {
  starterShips: Ship[];
  players: Player[];
  CreatePlayer: (player: CreatePlayerReq) => Promise<string>;
  FetchPlayer: (id: string) => Promise<Player>;
  ListUpgradesByPlayer: (id: string) => Promise<Upgrade[]>;
  UpdatePlayerHangarUpgrades: (
    playerID: string,
    upgradeID: number,
    action: string
  ) => Promise<void>;
  UpdatePlayerSlots: (
    playerID: string,
    upgradeID: number,
    action: string
  ) => Promise<void>;
}

interface PLState {
  chosenPlayer?: Player;
  isCreateOpen: boolean;
  players?: Player[];
  upgrades: Upgrade[];
}

class PlayerLobby extends React.Component<PLProps, PLState> {
  constructor(props: PLProps) {
    super(props);

    this.state = {
      isCreateOpen: false,
      upgrades: []
    };

    this.onCancelCreate = this.onCancelCreate.bind(this);
    this.onCreatePlayer = this.onCreatePlayer.bind(this);
    this.onEquipUpgrade = this.onEquipUpgrade.bind(this);
    this.onNewPlayer = this.onNewPlayer.bind(this);
    this.onPurchaseUpgrade = this.onPurchaseUpgrade.bind(this);
    this.onSelectPlayer = this.onSelectPlayer.bind(this);
    this.onUnequipUpgrade = this.onUnequipUpgrade.bind(this);
  }

  onCancelCreate(): void {
    this.setState({ isCreateOpen: false });
  }

  async onCreatePlayer(request: CreatePlayerReq): Promise<string> {
    const { CreatePlayer } = this.props;

    const player = await CreatePlayer(request);
    this.setState({ isCreateOpen: false });
    return player;
  }

  async onEquipUpgrade(id: number): Promise<void> {
    const { UpdatePlayerSlots } = this.props;

    await UpdatePlayerSlots(this.playerID(), id, 'add');
    this.updatePlayerState(this.playerID());
  }

  onNewPlayer(): void {
    this.setState({ isCreateOpen: true });
  }

  async onPurchaseUpgrade(id: number): Promise<void> {
    const { UpdatePlayerHangarUpgrades } = this.props;

    await UpdatePlayerHangarUpgrades(this.playerID(), id, 'add');
    this.updatePlayerState(this.playerID());
  }

  async onSelectPlayer(id: string): Promise<void> {
    this.updatePlayerState(id);
  }

  async onUnequipUpgrade(id: number): Promise<void> {
    const { UpdatePlayerSlots } = this.props;

    await UpdatePlayerSlots(this.playerID(), id, 'rem');
    this.updatePlayerState(this.playerID());
  }

  updatePlayerState(id: string): void {
    this.setPlayer(id);
    this.setUpgrades(id);
  }

  async setPlayer(id: string): Promise<void> {
    const { FetchPlayer } = this.props;

    const player = await FetchPlayer(id);
    this.setState({ chosenPlayer: player });
  }

  async setUpgrades(id: string): Promise<void> {
    const { ListUpgradesByPlayer } = this.props;

    const ugprades = await ListUpgradesByPlayer(id);
    this.setState({ upgrades: ugprades });
  }

  playerID(): string {
    const { chosenPlayer } = this.state;
    if (!chosenPlayer) {
      throw 'cannot purchase upgrade without a chosen player';
    }

    return chosenPlayer.id;
  }

  renderLobby(props: PLProps, state: PLState): JSX.Element {
    const { chosenPlayer, isCreateOpen, upgrades } = state;
    const { starterShips, players } = props;

    if (!!chosenPlayer) {
      return (
        <PlayerMenu
          player={chosenPlayer}
          upgrades={upgrades}
          EquipUpgrade={this.onEquipUpgrade}
          PurchaseUpgrade={this.onPurchaseUpgrade}
          UnequipUpgrade={this.onUnequipUpgrade}
        />
      );
    }
    if (isCreateOpen) {
      return (
        <PlayerForm
          starterShips={starterShips}
          CreatePlayer={this.onCreatePlayer}
          CancelForm={this.onCancelCreate}
          SelectPlayer={this.onSelectPlayer}
        />
      );
    }
    return (
      <PlayersList
        players={players}
        NewPlayer={this.onNewPlayer}
        SelectPlayer={this.onSelectPlayer}
      />
    );
  }

  render() {
    return (
      <div className="player-lobby">
        {this.renderLobby(this.props, this.state)}
      </div>
    );
  }
}

export default PlayerLobby;
