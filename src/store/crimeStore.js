import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import crime_store from '../reducers';

const crimeStore = () => {
    let mw = [thunk];
    return createStore(
        crime_store,
        applyMiddleware(...mw)
    );
};

export default crimeStore;