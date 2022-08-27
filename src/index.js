import React from 'react';
import ReactDOM from 'react-dom';
import {flow} from 'lodash';
import {withDevTools} from 'withDevTools';
import {withReducer} from 'withReducer';
import App from './components/App';
import './index.css';

/** Wrap App component with store providers */
const WrappedApp = flow(withReducer, withDevTools)(App);

ReactDOM.render(<WrappedApp />, document.getElementById('root'));
