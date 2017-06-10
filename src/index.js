import React from 'react';
import ReactDOM from 'react-dom';

import './styles/styles.css';
import Root from './display/Root';
import crimeStore from './store/crimeStore';

const store = crimeStore();

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
);
