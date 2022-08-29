import { Card, Row, Col, Statistic, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Doughnut, Pie, Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux'
import { dashboardAction, logout } from '../../actions/userActions';
import { getListDashboard } from '../../actions/dashboardAction';
import Loader from '../../components/Loader';
Chart.register(...registerables);



const openNotificationWithIcon = (type) => {
    notification[type]({
        message: 'Login Success',
    });
};

const DashboardScreen = () => {
    const dispatch = useDispatch();
    let listDashboard;
    const listDashboardSelector = useSelector((state) => state.dashboardList);
    const userCheckAccountSelector = useSelector((state) => state.userCheckAcc);
    const checkAccSuccess = userCheckAccountSelector.success;
    const { loading, error, success, dashboardInfo } = listDashboardSelector;
    useEffect(() => {
        // if (checkAccSuccess === true) {
        //     openNotificationWithIcon('success');
        // }
        dispatch(getListDashboard())

        if (loading === false) {
            if (error === "Request failed with status code 401") {
                console.log('LOGIN FAIL - 401')
                dispatch(logout());
            }
        }
    }, [error]);

    if (loading === false) {
        if (success === true) {
            listDashboard =
            {
                total_User: dashboardInfo[0].totalInt,
                totalRevenue: dashboardInfo[1].sumDouble,
                totalRevenueInMonth: dashboardInfo[2].sumDouble,
                totalOrd: dashboardInfo[3].totalInt
            }
        }
    }



    return (

        <div className="site-card-border-less-wrapper">
            {loading === true && <Loader />}
            {loading === false && success === true && <>
                <Card style={{ marginTop: 5, backgroundColor: 'rgba(242, 246, 248)' }}>
                    <h1>DASHBOARD</h1>
                </Card>

                <Card style={{ backgroundColor: 'rgba(242, 246, 248)', height: 'auto' }}
                >

                    <div className="site-statistic-demo-card">
                        <Row gutter={16}>
                            <Col span={6}>
                                <Card style={{ borderRadius: 10 }}>
                                    <Statistic
                                        title="Total User"
                                        value={listDashboard.total_User}
                                        valueStyle={{
                                            color: '#3f8600',
                                        }}
                                        // prefix={<ArrowUpOutlined />}
                                        suffix="Member"
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card style={{ borderRadius: 10 }}>
                                    <Statistic
                                        title="Total Revenue"
                                        value={listDashboard.totalRevenue}
                                        valueStyle={{
                                            color: '#cf1322',
                                        }}
                                        // prefix={<ArrowDownOutlined />}
                                        suffix="vnd"
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card style={{ borderRadius: 10 }}>
                                    <Statistic
                                        title="Total Revenue In Month"
                                        value={listDashboard.totalRevenueInMonth}
                                        valueStyle={{
                                            color: '#cf1322',
                                        }}
                                        // prefix={<ArrowDownOutlined />}
                                        suffix="vnd"
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card style={{ borderRadius: 10 }}>
                                    <Statistic
                                        title="Total Order"
                                        value={listDashboard.totalOrd}
                                        valueStyle={{
                                            color: '#cf1322',
                                        }}
                                        // prefix={<ArrowDownOutlined />}
                                        suffix="order"
                                    />
                                </Card>
                            </Col>

                        </Row>
                    </div>
                    <div style={{ marginTop: 50 }}>
                        <Line
                            data={{
                                labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
                                datasets: [
                                    {
                                        data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                                        label: "Africa",
                                        borderColor: "#3e95cd",
                                        fill: false
                                    },
                                    {
                                        data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
                                        label: "Asia",
                                        borderColor: "#8e5ea2",
                                        fill: false
                                    },
                                    {
                                        data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
                                        label: "Europe",
                                        borderColor: "#3cba9f",
                                        fill: false
                                    },
                                    {
                                        data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
                                        label: "Latin America",
                                        borderColor: "#e8c3b9",
                                        fill: false
                                    },
                                    {
                                        data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
                                        label: "North America",
                                        borderColor: "#c45850",
                                        fill: false
                                    }
                                ]
                            }}
                            options={{
                                title: {
                                    display: true,
                                    text: "World population per region (in millions)"
                                },
                                legend: {
                                    display: true,
                                    position: "bottom"
                                }
                            }}
                        />
                    </div>
                </Card>

            </>}


        </div >
    )
};

export default DashboardScreen;