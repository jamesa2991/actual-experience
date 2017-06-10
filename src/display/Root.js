import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import crimeStats from './crimeStats';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Route path="/" component={crimeStats} />
        </Router>
    </Provider>
);


export default Root;