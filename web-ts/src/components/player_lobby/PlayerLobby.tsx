import * as React from 'react';
import { Player } from 'client/Player';
import { Upgrade } from 'client/Upgrade';
import { Ship } from 'client/Ship';
import PlayersList from '../players_list';
import PlayerMenu from '../player_menu/index';
import PlayerForm from '../player_form/index';
import { PFState } from '../player_form/PlayerForm';

interface PLProps {
  starterShips: Ship[];
  CreatePlayer: (player: PFState) => string;
  ListUpgradesForPlayer: (id: string) => Upgrade[];
  FetchPlayer: (id: string) => Player;
  UpdatePlayerHangarUpgrades: (
    player_id: string,
    upgrade_id: number,
    action: string
  ) => void;
  UpdatePlayerSlots: (
    player_id: string,
    upgrade_id: number,
    action: string
  ) => void;
}
interface PLState {
  chosenPlayer?: Player;
  isCreateOpen: boolean;
  players: Player[];
  upgrades: Upgrade[];
}

class PlayerLobby extends React.Component<PLProps, PLState> {
  constructor(props: PLProps) {
    super(props);

    this.state = {
      isCreateOpen: false,
      players: [],
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

  onCreatePlayer(player: PFState): string {
    const { CreatePlayer } = this.props;

    return CreatePlayer(player);
  }

  onEquipUpgrade(id: number): void {
    const { UpdatePlayerSlots } = this.props;

    UpdatePlayerSlots(this.playerID(), id, 'add');
    this.updatePlayerState(this.playerID());
  }

  onNewPlayer(): void {
    this.setState({ isCreateOpen: true });
  }

  onPurchaseUpgrade(id: number): void {
    const { UpdatePlayerHangarUpgrades } = this.props;

    UpdatePlayerHangarUpgrades(this.playerID(), id, 'add');
    this.updatePlayerState(this.playerID());
  }

  onSelectPlayer(id: string): void {
    this.updatePlayerState(id);
  }

  onUnequipUpgrade(id: number): void {
    const { UpdatePlayerSlots } = this.props;

    UpdatePlayerSlots(this.playerID(), id, 'remove');
    this.updatePlayerState(this.playerID());
  }

  updatePlayerState(id: string): void {
    const { ListUpgradesForPlayer, FetchPlayer } = this.props;

    const player = FetchPlayer(id);
    const upgrades = ListUpgradesForPlayer(id);
    this.setState({ chosenPlayer: player, upgrades: upgrades });
  }

  playerID(): string {
    const { chosenPlayer } = this.state;
    if (!chosenPlayer) {
      throw 'cannot purchase upgrade without a chosen player';
    }

    return chosenPlayer.id;
  }

  renderLobby(props: PLProps, state: PLState): JSX.Element {
    const { chosenPlayer, isCreateOpen, players, upgrades } = state;
    const { starterShips } = props;

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
