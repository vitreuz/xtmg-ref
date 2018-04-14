import * as React from 'react';
import * as ReactDOM from 'react-dom';
import XWingFont from './components/xwing_font';
import { Action } from './client/Ship';

ReactDOM.render(
  <XWingFont symbol={Action.TargetLock} type={'action'} />,
  document.getElementById('root')
);
