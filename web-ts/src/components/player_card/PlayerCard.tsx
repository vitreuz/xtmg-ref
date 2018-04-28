import * as React from 'react';
import { Player, UpgradeAction } from '../../client/Player';
import ActionBar from '../action_bar';
import ManeuverCard from '../maneuver_card';
import StatusBar from '../status_bar';
import { ActionModifier } from '../action_bar/ActionBar';
import { Action } from '../../client/Ship';
import UpgradeSlots from '../upgrade_slots/index';
import { UpgradeSlot } from '../../client/Upgrade';

export interface PlayerCardProps {
  onSelectUpgrade: (slot: UpgradeSlot) => void;
  player: Player;
}

class PlayerCard extends React.Component<PlayerCardProps, {}> {
  render() {
    const { player, onSelectUpgrade } = this.props;
    const {
      name,
      callsign,
      current_xp,
      pilot_skill,
      ship,
      modifiers,
      slots
    } = player;
    const { actions, status, maneuvers } = ship;
    const upgradeActions = (!!modifiers && modifiers.upgrade_actions) || [];

    return (
      <div className="player-card">
        <div className="player-card-name">{name}</div>
        <div className="player-card-callsign">{callsign}</div>
        <div className="player-card-pilot-skill">{pilot_skill}</div>
        <div className="player-card-current-xp">{current_xp}</div>
        <div className="player-card-stats">
          <StatusBar base={status} />
        </div>
        <div className="player-card-actions">
          <ActionBar actions={actionModifiers(actions, upgradeActions)} />
        </div>
        <div className="player-card-maneuvers">
          <ManeuverCard maneuvers={maneuvers} />
        </div>
        <div className="player-card-upgrades">
          <UpgradeSlots slots={slots} onSelect={onSelectUpgrade} />
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
