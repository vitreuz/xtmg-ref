import * as React from 'react';
import { FiringArc, ShipStat, Status } from '../../client/Ship';
import XWingFont from '../xwing_font';
import { FontType } from '../xwing_font/XWingFont';

export interface StatusBarProps {
  base: Status;
  mods?: Status;
  live?: Status;
  firing_arc?: FiringArc;
}

function StatusBar({ base, mods, live, firing_arc }: StatusBarProps) {
  const { attack, agility, hull, shield } = calculateBase(base, mods);
  const diff = calculateDiff(live);

  return (
    <div className="status-bar">
      <div className="status-attack">
        {calculateStat(attack, diff.attack)}
        <span className="stuats-icon">
          {firing_arc !== undefined ? (
            <XWingFont symbol={firing_arc} type={FontType.firing_arc} />
          ) : (
            <XWingFont symbol={ShipStat.Attack} type={FontType.stat} />
          )}
        </span>
      </div>
      <div className="status-agility">
        {calculateStat(agility, diff.agility)}
        <span className="stuats-icon">
          <XWingFont symbol={ShipStat.Agility} type={FontType.stat} />
        </span>
      </div>
      <div className="status-hull">
        {calculateStat(hull, diff.hull)}
        <span className="stuats-icon">
          <XWingFont symbol={ShipStat.Hull} type={FontType.stat} />
        </span>
      </div>
      <div className="status-shield">
        {calculateStat(shield, diff.shield)}
        <span className="stuats-icon">
          <XWingFont symbol={ShipStat.Shield} type={FontType.stat} />
        </span>
      </div>
    </div>
  );
}

function calculateBase(base: Status, mods?: Status): Status {
  if (!!!mods) {
    return base;
  }

  return {
    attack: base.attack + mods.attack,
    agility: base.agility + mods.agility,
    hull: base.hull + mods.hull,
    shield: base.shield + mods.shield
  };
}

function calculateDiff(live?: Status): Status {
  if (!!!live) {
    return { attack: 0, agility: 0, hull: 0, shield: 0 };
  }

  return live;
}

function calculateStat(base: number, diff: number): JSX.Element {
  if (!!!diff) {
    return (
      <span className="status-value">
        <span className="final">{base}</span>
      </span>
    );
  }

  return (
    <span className="status-value">
      <span className="final">{`${base + diff}`}</span>
      <span className="modifier">
        {'(' + (diff > 0 ? '+' : '') + `${diff})`}
      </span>
    </span>
  );
}

export default StatusBar;
