import * as React from 'react';
import 'xwing-miniatures-font/dist/xwing-miniatures.css';
import { Bearing, FiringArc, ShipStat } from '../../client/Ship';
import './xwingfont.css';

export enum FontType {
  misc,
  action,
  firing_arc,
  maneuver,
  ship,
  slot,
  stat
}

export interface XWingFontProps {
  symbol: number | string;
  type: FontType;
}

function XWingFont({ symbol, type }: XWingFontProps) {
  if (isShip(type)) {
    return <i className={'xwing-ship xwing-miniatures-ship-' + symbol} />;
  }

  return (
    <i
      className={
        'xwing-font xwing-miniatures-font-' +
        convertSymbolToFont(symbol.toString(), type)
      }
    />
  );
}

function convertSymbolToFont(symbol: string, type: FontType): string {
  switch (type) {
    case FontType.action:
      return symbol.replace(' ', '').toLowerCase();
    case FontType.firing_arc:
      return firingArcSymbol(symbol);
    case FontType.maneuver:
      return Bearing[symbol].replace(' ', '').toLowerCase();
    case FontType.slot:
      return symbol.replace(' ', '').toLowerCase();
    case FontType.stat:
      return ShipStat[symbol].replace(' ', '').toLowerCase();
    default:
      return symbol.replace(' ', '').toLowerCase();
  }
}

function firingArcSymbol(firingArc: string): string {
  switch (firingArc) {
    case FiringArc.Auxiliary180:
      return 'attack-180';
    case FiringArc.AuxiliaryRear:
      return 'attack-frontback';
    case FiringArc.Front:
      return 'attack';
    default:
      return 'attack-' + FiringArc[firingArc].toLowerCase();
  }
}

function isShip(type: string | FontType): boolean {
  return FontType[type] === 'ship';
}

export default XWingFont;
