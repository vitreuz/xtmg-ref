import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'components/App';
import Client from 'client/Client';

ReactDOM.render(<App client={Client} />, document.getElementById('root'));
