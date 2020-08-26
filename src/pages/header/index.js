import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { HeaderWrapper, SummaryWrapper } from './style';
import { DatePicker, Radio, Space } from 'antd';
import moment from 'moment';

const monthFormat = 'YYYY/MM';

class Header extends Component {

    constructor(props) {
        super(props);
        this.onChangeMonth = this.onChangeDatePicker.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
    }

    render() {
        const { period, totalIncome, totalExpense } = this.props;
        return (
            <HeaderWrapper>
                <h5>Keep 记账</h5>
                <SummaryWrapper>
                    <Space direction="vertical" size={3}>
                        <Radio.Group value={period} onChange={this.handlePeriodChange}>
                            <Radio.Button value="year">年</Radio.Button>
                            <Radio.Button value="month">月</Radio.Button>
                            <Radio.Button value="day">日</Radio.Button>
                        </Radio.Group>
                        <DatePicker defaultValue={moment('2020/08', monthFormat)} format={monthFormat} onChange={this.onChangeDatePicker} picker={period} />
                    </Space>
                    <Space direction="horizontal" size={20}>
                        <div>收入： {totalIncome}</div>
                        <div>支出： {totalExpense}</div>
                    </Space>
                </SummaryWrapper>
            </HeaderWrapper>
        )
    }

    handlePeriodChange = e => {
        this.setState({ period: e.target.value });
    }

    onChangeDatePicker(date, dateString) {
        console.log(date, dateString);
    }

    componentDidMount() {
        this.props.initHeaderData();
    }
}

const mapStateToProps = (state) => {
    return {
        period: state.getIn(['header', 'period']),
        totalIncome: state.getIn(['header', 'totalIncome']),
        totalExpense: state.getIn(['header', 'totalExpense']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initHeaderData: () => {
            const action = actionCreators.getHeaderInfo();
            dispatch(action);
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
