import React from 'react';
import ReactDOM from 'react-dom';
import {withReducer} from 'withReducer';
import withReduxFeatures from './withReduxFeatures';
import App from './components/App';
import './index.css';

/** Wrap App component with store providers */
const WrappedApp = withReducer(App);

ReactDOM.render(<WrappedApp />, document.getElementById('root'));
