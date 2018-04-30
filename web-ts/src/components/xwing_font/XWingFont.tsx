import * as React from 'react';
import 'xwing-miniatures-font/dist/xwing-miniatures.css';
import { Action, Bearing, FiringArc, ShipStat } from '../../client/Ship';
import { UpgradeSlotType } from '../../client/Upgrade';
import './xwingfont.css';

export enum FontType {
  action,
  firing_arc,
  maneuver,
  ship,
  slot,
  stat
}

export function ParseFontType(
  text: string
): { type: FontType; symbol: number } {
  if (Action[text] !== undefined) {
    return { type: FontType.action, symbol: Action[text] };
  }
  if (UpgradeSlotType[text] !== undefined) {
    return { type: FontType.slot, symbol: UpgradeSlotType[text] };
  }

  throw new Error(`Non-exhaustive match for font type ${text}`);
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
      throw new Error(`non-exhaustive match for symbol ${symbol}`);
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
