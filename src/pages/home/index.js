import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HomeWrapper, ListWrapper, ChartWrapper } from './style';
import { Radio, Space, Button } from 'antd';
import List from './components/List';
import Chart from './components/Chart';
import AddModal from './components/AddModal';
import { actionCreators } from './store';

class Home extends Component {

    state = {
        mode: 'list',
        showModal: false,
    };

    constructor(props) {
        super(props);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        const { mode } = this.state;
        return (
            <HomeWrapper>
                <Space className="space" direction="horizontal">
                    <Radio.Group defaultValue={mode} buttonStyle="solid" onChange={this.handleModeChange}>
                        <Radio.Button value="list">列表模式</Radio.Button>
                        <Radio.Button value="chart">图表模式</Radio.Button>
                    </Radio.Group>
                    <Button type="primary" block onClick={this.onAddClick}>创建新的记账记录</Button>
                </Space>
                {
                    mode === 'list' ? (<ListWrapper><List /></ListWrapper>) : (<ChartWrapper><Chart /></ChartWrapper>)
                }
                <AddModal visible={this.state.showModal} handleOk={this.handleOk} handleCancel={this.handleCancel}/>
            </HomeWrapper>
        )
    }

    handleModeChange = e => {
        this.setState({ mode: e.target.value });
    };

    onChangeMonth(date, dateString) {
        console.log(date, dateString);
    }

    onAddClick = () => {
        this.setState({ showModal: true });
    }

    handleOk = (result) => {
        console.log('result:', result)
    }

    handleCancel = () => {
        this.setState({ showModal: false });
    }

    componentDidMount() {
        this.props.initListData();
    }

}

const mapStateToProps = (state) => {
    return {
        list: state.getIn(['home', 'list'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initListData: () => {
            const action = actionCreators.getListInfo();
            dispatch(action);
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
