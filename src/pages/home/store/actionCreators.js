import * as constants from './constants';
// import { fromJS } from 'immutable';
import axios from 'axios';

const initList = (data) => ({
    type: constants.INIT_LIST,
    period: data.period,
    data: data.list
})

export const getListInfo = () => {
    return (dispatch) => {
        axios.get('api/home.json').then((res) => {
            const data = res.data;
            dispatch(initList(data.data));
        }).catch(() => {
            console.log('error')
        })
    }
}

export const updateListData = (data) => ({
    type: constants.UPDATE_LIST,
    data
})
