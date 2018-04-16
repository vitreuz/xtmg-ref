import * as React from 'react';
import { Upgrade } from '../../client/Upgrade';
import XWingFont from '../xwing_font';
import { ParseFontType } from '../xwing_font/XWingFont';

export interface UpgradeBaseProps {
  upgrade: Upgrade;
}

function UpgradeBase({ upgrade }: UpgradeBaseProps) {
  return (
    <div className="upgrade-item">
      <div className="upgrade-item-name">
        <span className="field-value">{upgrade.name}</span>
      </div>
      {!!upgrade.attack && combatDetails(upgrade)}
      <div className="upgrade-item-text">{setInnerText(upgrade.text)}</div>
    </div>
  );
}

function setInnerText(text: string) {
  return Array.from(matchGenerator(text));
}

function* matchGenerator(text: string) {
  let remaider = text;

  let i: number = 0;
  while (true) {
    const match = remaider.match('\\[(.*?)\\]');
    if (!!!match) {
      yield dangerousInnerHTML(remaider, i);
      break;
    }

    const splits = remaider.split(match[0]);
    yield dangerousInnerHTML(splits[0], i);
    yield inlineXWingFont(match[1], i);

    remaider = splits[1];
    i++;
  }
}

function dangerousInnerHTML(text: string, key: number): JSX.Element {
  const innerHTML = { __html: text };
  return <span dangerouslySetInnerHTML={innerHTML} key={key} />;
}

function inlineXWingFont(match: string, key: number): JSX.Element {
  const text = match.replace(' ', '');
  const symbol = ParseFontType(text);

  return (
    <span key={key}>
      <XWingFont type={symbol.type} symbol={symbol.symbol} />
    </span>
  );
}

function combatDetails(upgrade: Upgrade) {
  return (
    <div className="upgrade-item-combat">
      <div className="upgrade-item-combat-attack">
        <span className="field-icon" />
        <span className="field-value">{upgrade.attack}</span>
      </div>
      <div className="upgrade-item-combat-range">
        <span className="field-name">Range</span>{' '}
        <span className="field-value">{upgrade.range}</span>
      </div>
    </div>
  );
}

export default UpgradeBase;
