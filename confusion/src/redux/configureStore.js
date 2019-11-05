/**
 * Here we crate a store. It has a Reducer and a state. 
 */

import { createStore, combineReducers } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';

export const ConfigureStore = () => {
    const store = createStore(
       combineReducers({
           dishes: Dishes,
           comments: Comments,
           promotions: Promotions,
           leaders: Leaders
       })
    );

    return store;
}