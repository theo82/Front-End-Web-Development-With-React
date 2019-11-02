import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

export const initialState = {

    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS

};

/**
 * When there reducer is first called by the store, the state is complety empty
 * @param {*} state is initialized to initialState
 * @param {*} action is sent to store 
 */
export const Reducer = (state = initialState, action) => {
    return state;
};