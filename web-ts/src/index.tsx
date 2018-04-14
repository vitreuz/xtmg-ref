import * as React from 'react';
import * as ReactDOM from 'react-dom';
import XWingFont from './components/xwing_font';
import { Action } from './client/Ship';
import { FontType } from 'xwing_font/XWingFont';

ReactDOM.render(
  <XWingFont symbol={Action.Evade} type={FontType.action} />,
  document.getElementById('root')
);
