import React, { useEffect, useState } from 'react'
import { Layout, Modal, Row, Col, notification } from 'antd'
import styled from 'styled-components'
import 'antd/dist/antd.css';
import { Link, browserHistory } from 'react-router';
import {
    login,
} from './../../api/api';
import {
    CloseCircleOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

//const endpoint = process.env.REACT_APP_ENDPOINT_URL


const App = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signup, setSignUp] = useState(false);
    const [namainstansi, setNamaInstansi] = useState('');
    const [email, setEmail] = useState('');
    const [messagebox, setMmessageBox] = useState(false)
    const [message, setMessage] = useState('')
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();


    useEffect(() => {
        //localStorage.clear();
        const savedDatas = localStorage.getItem('isLogin')
        console.log(`save data ${savedDatas}`)
        if (savedDatas !== null && savedDatas.accessToken !== null) {
            dispatch({ type: "SAVEDATAS" })
            browserHistory.push(`${process.env.PUBLIC_URL}/dashboard`)
        } else {
            console.log('null')
        }
    }, [])

    const loginFunc = async () => {
        if (username === '' || password === '') {
            notification.open({
                message: 'Gagal Login',
                description:
                    'Form username atau password tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
                username,
                password
            }
            const url = "loginadmin"
            const cek = await login(datas, url)
            if (cek === 1) {
                browserHistory.push(`${process.env.PUBLIC_URL}/dashboard`)
                const savedDatas = JSON.parse(localStorage.getItem('isLogin'))
                console.log(savedDatas)
            } else {
                notification.open({
                    message: 'username atau password tidak sesuai',
                    description:
                        '',
                    icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
                });
            }
        }
    }

    const toggleSignUp = async () => {
        setSignUp(!signup)
    }

    const togglemessagebox = async () => {
        setMmessageBox(!messagebox)
    }

    return (
        <div className="form-body without-side">
        <div className="website-logo">
            <a href="index.html">
                <div className="logo">
                    <img className="logo-size" src="images/logo-light.svg" alt="" />
                </div>
            </a>
        </div>
        <div className="row">
            <div className="img-holder">
                <div className="bg"></div>
                <div className="info-holder">
                    <img src={require('./../../assets/images/graphic2.svg')} alt="" />
                </div>
            </div>
            <div className="form-holder">
                <div className="form-content">
                    <div className="form-items">
                        <h3>Login Administrator</h3>
                        <p>Sistem Informasi Keuangan Dinas Kesehatan Kabupaten Sambas</p>
                        <form>
                            <input className="form-control" type="text" name="username"  onChange={e => setUsername(e.target.value)}  placeholder="Username" required />
                            <input className="form-control" type="password" name="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                        </form>
                        <div className="form-button">
                                <button  onClick={loginFunc} className="ibtn" style={{ backgroundColor: '#00a8ff', color:' white' }}>Login</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

}

export default App