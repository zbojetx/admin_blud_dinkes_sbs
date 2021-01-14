import React, { useState, useEffect } from 'react';
import { Layout, PageHeader, Row, Col, Card, Typography } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    SkinOutlined,
    ShoppingCartOutlined,
    CarOutlined,
    UsergroupAddOutlined,
    CodeSandboxOutlined,
    TransactionOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createupdate, getall, remove, getbyid, getallpost } from '../api/api';
import { Link, browserHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import NumberFormat from 'react-number-format'

const { Title } = Typography;

const CardBox = styled.div`
    border: 1px solid #a5b1c2;
    margin-top: 20px;
    padding: 10px;
    border : 5px;
`;
const Label = styled.p`
    margin-bottom: 2px;
    font-weight: bold;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
`;
const { Header, Sider, Content } = Layout;

function Dashboard() {
    const counter = useSelector(state => state.counter)
    const dispatch = useDispatch();
    const [dashboard, setDashboard] = useState([])
    const [blud, setBlud] = useState('')
    const [pagu, setPagu] = useState('')
    const [realisasi, setRealisasi] = useState('')
    const [dibagikan, setDibagikan] = useState('')
    const [reslisasipersen, setRealisasiPersen] = useState('')

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = []
        const url = 'dashboard'
        let realisasiforcount= 0 ;
        let dibagikanforcount= 0
        let dashboardData = await getall(url)
        setBlud(dashboardData.jumlahblud[0].total)
        console.log(dashboardData.anggaran_2020.length)
        if (dashboardData.anggaran_2020.length === 0) {
            setPagu(0)
        } else {
            setPagu(dashboardData.anggaran_2020[0].total_pagu)
        }
        if (dashboardData.anggaran_dibagikan[0].total === null) {
            setDibagikan(0)
        } else {
            dibagikanforcount = dashboardData.anggaran_dibagikan[0].total
            setDibagikan(dashboardData.anggaran_dibagikan[0].total)
        }
        if (dashboardData.realisasianggaran[0].total === null) {
            setRealisasi(0)
        } else {
            realisasiforcount = dashboardData.realisasianggaran[0].total
            setRealisasi(dashboardData.realisasianggaran[0].total)
        }

        await hitungpersen(realisasiforcount, dibagikanforcount)
    }

    const hitungpersen = async(x, y) => {
        console.log(x)
        console.log(y)
        const realisasipersenz = await parseInt(x) / parseInt(y) * 100
        setRealisasiPersen(realisasipersenz)
    }

    const logout = async () => {
        await localStorage.clear()
        browserHistory.push('/')
    }

    return (
        <Content
            //className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >

            <Row style={{ width: "100%" }}>
                <Col xs={12} sm={12} md={5} lg={5} xl={5} style={{ padding: 10 }}>
                    <Card
                        style={{ width: '100%', borderWidth: 1 }}
                    >
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <img src="https://www.flaticon.com/svg/static/icons/svg/3616/3616975.svg" style={{ width: 80 }} />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <p style={{ fontSize: 16, fontWeight: 'bold' }}>{blud}</p>
                                <Title style={{ fontSize: 14, marginTop: -10 }}>Badan Layanan Umum Daerah (BLUD)</Title>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={12} sm={12} md={5} lg={5} xl={5} style={{ padding: 10 }}>
                    <Card
                        style={{ width: '100%', borderWidth: 1 }}
                    >
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <img src="https://www.flaticon.com/svg/static/icons/svg/3617/3617143.svg" style={{ width: 80 }} />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <p style={{ fontSize: 16, fontWeight: 'bold' }}>Rp <NumberFormat thousandSeparator={true} displayType={'text'} value={pagu} /></p>
                                <Title style={{ fontSize: 14, marginTop: -10 }}>Total Pagu Anggaran {localStorage.getItem('tahun')} </Title>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={12} sm={12} md={5} lg={5} xl={5} style={{ padding: 10 }}>
                    <Card
                        style={{ width: '100%', borderWidth: 1 }}
                    >
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <img src="https://www.flaticon.com/svg/static/icons/svg/3617/3617174.svg" style={{ width: 80 }} />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <p style={{ fontSize: 16, fontWeight: 'bold' }}>Rp <NumberFormat thousandSeparator={true} displayType={'text'} value={dibagikan} /></p>
                                <Title style={{ fontSize: 14, marginTop: -10 }}>Total Pagu Anggaran BLUD {localStorage.getItem('tahun')}</Title>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={12} sm={12} md={5} lg={5} xl={5} style={{ padding: 10 }}>
                    <Card
                        style={{ width: '100%', borderWidth: 1 }}
                    >
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <img src="https://www.flaticon.com/svg/static/icons/svg/3616/3616866.svg" style={{ width: 80 }} />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                                <p style={{ fontSize: 16, fontWeight: 'bold' }}>Rp <NumberFormat thousandSeparator={true} displayType={'text'} value={realisasi} /></p>
                                <Title style={{ fontSize: 14, marginTop: -10 }}>Pagu Anggaran Terealisasi </Title>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4} style={{ padding: 10 }}>
                    <Card
                        style={{ width: '100%', borderWidth: 1 }}
                    >
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <img src="https://www.flaticon.com/svg/static/icons/svg/3616/3616866.svg" style={{ width: 80 }} />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                                <p style={{ fontSize: 16, fontWeight: 'bold' }}>{Number.parseFloat(reslisasipersen).toFixed(2)} %</p>
                                <Title style={{ fontSize: 14, marginTop: -10 }}>Pagu Anggaran Terealisasi (%)</Title>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Content>
    )
}

export default Dashboard;