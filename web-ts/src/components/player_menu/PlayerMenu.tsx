import * as React from 'react';
import PlayerCard from '../player_card';
import { Player } from '../../client/Player';
import { Upgrade } from '../../client/Upgrade';
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

  PurchaseUpgrade: (id: number) => void;
}

interface PMState {
  activeDisplay: Display;
}

class PlayerMenu extends React.Component<PMProps, PMState> {
  constructor(props: PMProps) {
    super(props);

    this.state = {
      activeDisplay: 0
    };

    this.setDisplay = this.setDisplay.bind(this);
  }

  setDisplay(display: Display): void {
    this.setState({ activeDisplay: display });
  }

  render() {
    const { activeDisplay } = this.state;
    return (
      <div className="player-menu">
        <MenuBar
          current={activeDisplay}
          type={Display}
          onClick={this.setDisplay}
        />
        {chooseDisplay(activeDisplay, this.props)}
      </div>
    );
  }
}

function chooseDisplay(active: Display, props: PMProps): JSX.Element {
  const { player, upgrades, PurchaseUpgrade } = props;
  const { current_xp } = player;

  switch (active) {
    case Display.shop:
      return (
        <UpgradeShop
          current_xp={current_xp}
          upgrades={upgrades}
          onPurchase={PurchaseUpgrade}
        />
      );
    case Display.inventory:
      return <UpgradeInventory />;
    default:
      return <PlayerCard player={player} />;
  }
}

export default PlayerMenu;
