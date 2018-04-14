import * as React from 'react';
import { Player } from '../../client/Player';
import ActionBar from '../action_bar';
import ManeuverCard from '../maneuver_card';
import StatusBar from '../status_bar';
import UpgradesCard from '../upgrades_card';

export interface PlayerCardProps {
  player: Player;
}

class PlayerCard extends React.Component<PlayerCardProps, {}> {
  render() {
    const { player } = this.props;
    const { name, callsign, pilot_skill } = player;

    return (
      <div className="player-card">
        <div className="player-card-name">{name}</div>
        <div className="player-card-callsign">{callsign}</div>
        <div className="player-card-pilot-skill">{pilot_skill}</div>
        <div className="player-card-stats">
          <StatusBar />
        </div>
        <div className="player-card-actions">
          <ActionBar />
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

export default PlayerCard;
