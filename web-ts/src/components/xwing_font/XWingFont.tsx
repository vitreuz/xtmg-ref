import * as React from 'react';
import { Action, ShipStat, FiringArc } from '../../client/Ship';
import { UpgradeSlotType } from '../../client/Upgrade';
import './xwingfont.css';
import 'xwing-miniatures-font/dist/xwing-miniatures.css';

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
  symbol: number;
  type: string | FontType;
}

function XWingFont({ symbol, type }: XWingFontProps) {
  if (isShip(type)) {
    return <div />;
  }

  return (
    <i
      className={
        'xwing-font xwing-miniatures-font-' + convertSymbolToFont(symbol, type)
      }
    />
  );
}

function convertSymbolToFont(symbol: number, type: string | FontType): string {
  switch (FontType[type]) {
    case 'action':
      return Action[symbol].toLowerCase();
    case 'slot':
      return UpgradeSlotType[symbol].toLowerCase();
    case 'stat':
      return ShipStat[symbol].toLowerCase();
    case 'firing_arc':
      return firingArcSymbol(symbol);
    default:
      return '' + type;
  }
}

function firingArcSymbol(firingArc: FiringArc): string {
  switch (firingArc) {
    case FiringArc.Auxiliary180:
      return 'attack-180';
    case FiringArc.AuxiliaryRear:
      return 'attack-frontback';
    default:
      return 'attack-' + FiringArc[firingArc].toLowerCase();
  }
}

function isShip(type: string | FontType): boolean {
  return FontType[type] === 'ship';
}

export default XWingFont;
