import * as React from 'react';
import { Action } from '../../client/Ship';
import { Upgrade } from '../../client/Upgrade';
import XWingFont from '../xwing_font';
import { FontType } from '../xwing_font/XWingFont';

export interface ActionModifier {
  action: Action;
  upgrade?: Upgrade;
}

export interface ActionBarProps {
  actions: ActionModifier[];
}

function ActionBar({ actions }: ActionBarProps) {
  return <div className="action-bar">{listActions(actions)}</div>;
}

function listActions(ams: ActionModifier[]) {
  return ams.map((am, i) => {
    const { action, upgrade } = am;
    if (!!upgrade) {
      return (
        <span className="action-bar-action" key={i}>
          <span className="action-bar-action-upgraded">
            <XWingFont symbol={action} type={FontType.action} />
          </span>
          <XWingFont symbol={upgrade.slot} type={FontType.upgrade} />
        </span>
      );
    }

    return (
      <span className="action-bar-action" key={i}>
        <XWingFont symbol={action} type={FontType.action} />
      </span>
    );
  });
}

export default ActionBar;
