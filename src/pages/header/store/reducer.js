import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    period: 'month',
    totalIncome: 0,
    totalExpense: 0
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.INIT_HEADER:
            return state.merge({
                period: action.period,
                totalIncome: action.totalIncome,
                totalExpense: action.totalExpense
            })
        default:
            return state;
    }
}