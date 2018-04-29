import * as React from 'react';
import PlayerCard from '../player_card';
import { Player } from '../../client/Player';
import { Upgrade, UpgradeSlot } from '../../client/Upgrade';
import UpgradeInventory from '../upgrade_inventory/index';
import UpgradeShop from '../upgrade_shop/index';
import MenuBar from '../menu_bar/index';

export enum Display {
  player,
  inventory,
  shop
}

interface PMProps {
  player: Player;
  upgrades: Upgrade[];

  EquipUpgrade: (id: number) => void;
  PurchaseUpgrade: (id: number) => void;
  UnequipUpgrade: (id: number) => void;
}

interface PMState {
  activeDisplay: Display;
  activeSlot?: UpgradeSlot;
}

class PlayerMenu extends React.Component<PMProps, PMState> {
  constructor(props: PMProps) {
    super(props);

    this.state = {
      activeDisplay: 0,
      activeSlot: undefined
    };

    this.setDisplay = this.setDisplay.bind(this);
    this.setSlot = this.setSlot.bind(this);

    this.chooseDisplay = this.chooseDisplay.bind(this);
    this.selectUpgrade = this.selectUpgrade.bind(this);
  }

  setDisplay(display: Display): void {
    this.setState({ activeDisplay: display });
  }

  setSlot(slot: UpgradeSlot): void {
    this.setState({ activeSlot: slot });
  }

  unsetSlot(): void {
    this.setState({ activeSlot: undefined });
  }

  chooseDisplay(state: PMState, props: PMProps): JSX.Element {
    const { player, upgrades } = props;
    const { PurchaseUpgrade, UnequipUpgrade } = props;
    const { current_xp, hangar } = player;

    const { activeDisplay, activeSlot } = state;

    switch (activeDisplay) {
      case Display.shop:
        return (
          <UpgradeShop
            current_xp={current_xp}
            upgrades={upgrades}
            upgradeSlot={activeSlot}
            onEquip={this.onEquip(props)}
            onPurchase={PurchaseUpgrade}
          />
        );
      case Display.inventory:
        return (
          <UpgradeInventory
            upgradeSlot={activeSlot}
            upgrades={hangar.upgrades}
            onEquip={this.onEquip(props)}
            onUnequip={UnequipUpgrade}
          />
        );
      default:
        return (
          <PlayerCard player={player} onSelectUpgrade={this.selectUpgrade} />
        );
    }
  }

  onEquip({ EquipUpgrade }: PMProps): (id: number) => void {
    return (id: number) => {
      EquipUpgrade(id);

      this.setDisplay(Display.player);
      this.unsetSlot();
    };
  }

  selectUpgrade(slot: UpgradeSlot): void {
    this.setSlot(slot);

    if (!slot.upgrade) {
      this.setDisplay(Display.shop);
    } else {
      this.setDisplay(Display.inventory);
    }
  }

  render() {
    const { activeDisplay, activeSlot } = this.state;

    return (
      <div className="player-menu">
        <MenuBar
          currentID={activeDisplay}
          lock={activeSlot === undefined}
          type={Display}
          onClick={this.setDisplay}
        />
        {this.chooseDisplay(this.state, this.props)}
      </div>
    );
  }
}

export default PlayerMenu;
