import { Card, Row, Col, Statistic, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Doughnut, Pie, Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux'
import { dashboardAction, logout } from '../../actions/userActions';
import { getListDashboard } from '../../actions/dashboardAction';
import Loader from '../../components/Loader';
import axios from 'axios';

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
    const userLoginInfo = useSelector((state) => state.userLogin);
    const { userInfo } = userLoginInfo;
    const [loadingStatistic, setLoadingStatistic] = useState()
    const [statisticData, setStatisticData] = useState([])
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



    useEffect(() => {
        getStatistic()
    }, []);

    const getStatistic = async () => {
        try {
            setLoadingStatistic(true)
            const res = await axios.get(`/order/getListStatistic`, {
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })
            setStatisticData(res?.data?.data)
            setLoadingStatistic(false)
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // if (loadingStatistic === false) {

    // }

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
                                        title="Total Revenue Last Month"
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
                                labels: statisticData?.map(e => e.dateTime),
                                datasets: [
                                    {
                                        data: statisticData?.map(e => e.totalRevenue),
                                        label: "Total Revenue per day",
                                        borderColor: "#3e95cd",
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