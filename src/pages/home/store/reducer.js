import * as constants from './constants';

const defaultState = {
    period: 'month',
    list: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.INIT_LIST:
            const newState = JSON.parse(JSON.stringify(state));
            newState.list = [...action.data];
            newState.period = action.period;
            return newState;
        case constants.UPDATE_LIST:
            const copyState = JSON.parse(JSON.stringify(state));
            copyState.list = [...action.data];
            return copyState;
        case constants.ADD_ITEM:
            const copyState2 = JSON.parse(JSON.stringify(state));
            copyState2.list.unshift(action.data);
            return copyState2;
        default:
            return state;
    }
}