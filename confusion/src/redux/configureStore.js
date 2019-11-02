/**
 * Here we crate a store. It has a Reducer and a state. 
 */

import { createStore } from 'redux';
import { Reducer, initialState} from './reducer';

export const ConfigureStore = () => {
    const store = createStore(
        Reducer, 
        initialState
    );

    return store;
}