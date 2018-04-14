import * as React from 'react';
import { Action } from '../../client/Ship';
import './xwingfont.css';
import 'xwing-miniatures-font/dist/xwing-miniatures.css';

export enum FontType {
  action,
  firing_arc,
  maneuver,
  ship,
  slot
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
    default:
      return '' + type;
  }
}

function isShip(type: string | FontType): boolean {
  return FontType[type] === 'ship';
}

export default XWingFont;
