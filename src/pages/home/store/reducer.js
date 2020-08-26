import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    period: 'month',
    list: []
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.INIT_LIST:
            return state.merge({
                period: action.period,
                list: action.data
            });
        case constants.UPDATE_LIST:
            return state.set('list', action.data);
        default:
            return state;
    }
}