import React from 'react';
import ReactDOM from 'react-dom';
import {flow} from 'lodash';
import {withDevTools, withStore} from 'stateManagement';
import {App} from './components/App';
import './index.css';

/** Wrap App component with store providers */
const WrappedApp = flow(withStore, withDevTools)(App);

ReactDOM.render(<WrappedApp />, document.getElementById('root'));
