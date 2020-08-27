import React, { Component } from 'react';
import Highcharts from "highcharts";

const colors = [
    "#B056F6",
    "#4DACF1",
    "#86DB4F",
    "#E86153",
    "#FFA929",
    "#E27588"
];

const incomeData = [
    {
        name: "其他",
        y: 18,
        color: colors[1]
    },
    {
        name: "理财收益",
        y: 24,
        color: colors[4]
    },
    {
        name: "工资",
        y: 58,
        color: colors[0]
    }
];

const expenseData = [
    {
        name: "其他",
        y: 28,
        color: colors[0]
    },
    {
        name: "理财定投",
        y: 24,
        color: colors[4]
    },
    {
        name: "消费",
        y: 48,
        color: colors[1]
    }
];

class Chart extends Component {
    pieChart1;
    pieChart2;

    getPieChartOption(id, title, data) {
        return {
            chart: {
                renderTo: id
            },
            credits: {
                enabled: false
            },
            title: {
                text: title
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            series: [
                {
                    type: "pie",
                    name: "Value",
                    data: data
                }
            ]
        }
    }

    componentDidMount() {
        this.pieOption1 = this.getPieChartOption("pie_chart_1", '本月收入', incomeData);
        this.pieChart1 = new Highcharts.Chart(this.pieOption1);
        this.pieOption2 = this.getPieChartOption("pie_chart_2", '本月支出', expenseData);
        this.pieChart2 = new Highcharts.Chart(this.pieOption2);
    }
    componentWillUnmount() {
        this.pieChart1.destroy();
    }

    render() {
        return (
            <div className="chart_container">
                <div id="pie_chart_1" style={{ width: 300, height: 200 }} />
                <div id="pie_chart_2" style={{ width: 300, height: 200 }} />
            </div>
        )
    }
}

export default Chart;