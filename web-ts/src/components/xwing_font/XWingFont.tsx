import * as React from 'react';
import { Action } from '../../client/Ship';
import { UpgradeSlotType } from '../../client/Upgrade';
import './xwingfont.css';
import 'xwing-miniatures-font/dist/xwing-miniatures.css';

export enum FontType {
  action,
  firing_arc,
  maneuver,
  ship,
  slot
}

export function ParseFontType(
  text: string
): { type: FontType; symbol: number } {
  if (!!Action[text]) {
    return { type: FontType.action, symbol: Action[text] };
  }
  if (!!UpgradeSlotType[text]) {
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
    default:
      return '' + type;
  }
}

function isShip(type: string | FontType): boolean {
  return FontType[type] === 'ship';
}

export default XWingFont;
