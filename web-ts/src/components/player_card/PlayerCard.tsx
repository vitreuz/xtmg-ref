import * as React from 'react';
import { Player, UpgradeAction } from '../../client/Player';
import ActionBar from '../action_bar';
import ManeuverCard from '../maneuver_card';
import StatusBar from '../status_bar';
import UpgradesCard from '../upgrades_card';
import { ActionModifier } from '../action_bar/ActionBar';
import { Action } from '../../client/Ship';

export interface PlayerCardProps {
  player: Player;
}

class PlayerCard extends React.Component<PlayerCardProps, {}> {
  render() {
    const { player } = this.props;
    const { name, callsign, pilot_skill, ship, modifiers } = player;
    const { actions } = ship;
    const upgradeActions = (!!modifiers && modifiers.upgrade_actions) || [];

    return (
      <div className="player-card">
        <div className="player-card-name">{name}</div>
        <div className="player-card-callsign">{callsign}</div>
        <div className="player-card-pilot-skill">{pilot_skill}</div>
        <div className="player-card-stats">
          <StatusBar />
        </div>
        <div className="player-card-actions">
          <ActionBar actions={actionModifiers(actions, upgradeActions)} />
        </div>
        <div className="player-card-maneuvers">
          <ManeuverCard />
        </div>
        <div className="player-card-upgrades">
          <UpgradesCard />
        </div>
      </div>
    );
  }
}

function actionModifiers(actions: Action[], modifiers: UpgradeAction[]) {
  const base: ActionModifier[] = actions.map(action => ({ action: action }));
  const mods: ActionModifier[] = modifiers.map(upgradeAction => ({
    action: upgradeAction.action,
    upgrade: upgradeAction.upgrade
  }));

  return base.concat(mods);
}

export default PlayerCard;
