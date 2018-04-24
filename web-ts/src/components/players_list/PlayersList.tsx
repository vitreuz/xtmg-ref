import * as React from 'react';
import { Player } from '../../client/Player';
import XWingFont from '../xwing_font/index';
import { FontType } from '../xwing_font/XWingFont';
import { UpgradeSlot } from '../../client/Upgrade';

export interface PLProps {
  players: Player[];
}

function PlayersList({ players }: PLProps) {
  return (
    <div className="players-list">
      <ul className="players-list-list">
        {listPlayers(players)}
        <li className="players-list-item">
          <button className="players-list-newplayer-button">New Player</button>
        </li>
      </ul>
    </div>
  );
}

function listPlayers(players: Player[]): JSX.Element[] {
  return players.map((player, i) => (
    <li className="players-list-item" key={i}>
      <button className="players-list-player-button">
        <PlayerSummary player={player} />
      </button>
    </li>
  ));
}

interface PSProps {
  player: Player;
}
export function PlayerSummary({ player }: PSProps): JSX.Element {
  const { name, callsign, pilot_skill, ship, slots } = player;
  const { xws } = ship;

  return (
    <div className="player-summary">
      <div className="player-summary-name">{name}</div>
      <div className="player-summary-callsign">{callsign}</div>
      <div className="player-summary-pilot-skill">{pilot_skill}</div>
      <div className="player-summary-ship">
        <XWingFont symbol={xws} type={FontType.ship} />
      </div>
      <div className="player-summary-slots">{listSlots(slots)}</div>
    </div>
  );
}

function listSlots(slots: UpgradeSlot[]): (JSX.Element | undefined)[] {
  return slots.map((slot, i) => {
    if (slot.upgrade === undefined) {
      return;
    }

    return (
      <span className="player-summary-slot-symbol" key={i}>
        <XWingFont symbol={slot.slot} type={FontType.slot} />
      </span>
    );
  });
}

export default PlayersList;
