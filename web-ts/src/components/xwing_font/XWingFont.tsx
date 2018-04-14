import * as React from 'react';
import { Action } from '../../client/Ship';
import './xwingfont.css';
import 'xwing-miniatures-font/dist/xwing-miniatures.css';

export interface XWingFontProps {
  symbol: number;
  type: string;
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

function convertSymbolToFont(symbol: number, type: string): string {
  switch (type) {
    case 'action':
      return Action[symbol].toLowerCase();
    default:
      return '';
  }
}

function isShip(type: string): boolean {
  return type === 'ship';
}

export default XWingFont;
