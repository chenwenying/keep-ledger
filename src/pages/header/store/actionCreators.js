import * as constants from './constants';
import axios from 'axios';

const initHeader = (data) => ({
    type: constants.INIT_HEADER,
    period: data.period,
    totalIncome: data.totalIncome,
    totalExpense: data.totalExpense
})

export const getHeaderInfo = () => {
    return (dispatch) => {
        axios.get('api/header.json').then((res) => {
            const data = res.data;
            dispatch(initHeader(data.data));
        }).catch(() => {
            console.log('error')
        })
    }
}
