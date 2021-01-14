import React, { useState, useEffect } from 'react';
import {
    Layout,
    PageHeader,
    Row,
    Col,
    Modal,
    Form,
    Space,
    Divider,
    notification,
    Select,
    Card
} from 'antd';
import {
    CloseCircleOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import TextArea from 'antd/lib/input/TextArea';
import {
    getbyid, getall, createupdate
} from '../api/api';
import { isLogin } from './../reducer/LocalStoradge'
import styled from 'styled-components'

const InputBoxAbove = styled.div`
    border: 1px solid #a5b1c2;
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px 5px 0px 0px ;
`;
const InputBoxCenter = styled.div`
    border-left: 1px solid #a5b1c2;
    border-right: 1px solid #a5b1c2;
    border-bottom: 1px solid #a5b1c2;
    padding: 10px;
`;

const InputBoxBottom = styled.div`
    border-bottom: 1px solid #a5b1c2;
    border-left: 1px solid #a5b1c2;
    border-right: 1px solid #a5b1c2;
    padding: 10px;
    border-radius: 0px 0px 5px 5px;
`;

const Input = styled.input`
    width: 100%;
    border: 0px;
    font-family: 'Montserrat', sans-serif;
    &:focus{
        outline: none;
    }
`;

const Label = styled.p`
    margin-bottom: 2px;
    font-weight: bold;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
`;

const Button = styled.button`
    margin-top: 20px;
    background-color:#4b7bec;
    border: 1px solid #4b7bec;
    border-radius: 5px;
    color: white;
    padding: 7px;
    float: right;
    cursor: pointer;
    font-weight: bold;
    width: 100%;
    &:hover{
        color: #3498db;
        border: 1px solid #3498db;
        font-weight: bold;
    }
`;


const { Header, Sider, Content } = Layout;
const { Option } = Select;

function Blud() {
    const [id_blud, setIdBlud] = useState('')
    const [kode_blud, setKodeBlud] = useState('')
    const [nama_blud, setNamaBlud] = useState('')
    const [alamat_blud, setAlamatBlud] = useState('')
    const [nama_kepala_blud, setNamaKepalaBlud] = useState('')
    const [nip_kepala_blud, setNipKepalaBlud] = useState('')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
    const [logo, setLogo] = useState('')

    useEffect(() => {
        //localStorage.clear()
        //getUser()
        isLoginFunc()
    }, []);

    const getBludbyId = async (id) => {
        let idblud = id
        let url = 'bludbyid'
        let data = await getbyid(idblud, url)
        console.log(data)
        setKodeBlud(data[0].kode_blud)
        setNamaBlud(data[0].nama_blud)
        setAlamatBlud(data[0].alamat_blud)
        setNamaKepalaBlud(data[0].nama_kepala_blud)
        setNipKepalaBlud(data[0].nip_kepala_blud)
        setLogo(data[0].logo)
        setUsername(data[0].username)
        setEmail(data[0].email)
    }

    const isLoginFunc = async () => {
        const loginDatas = await isLogin()
        console.log(loginDatas)
        if (loginDatas !== null) {
            setIdBlud(loginDatas.data[0].id)
            getBludbyId(loginDatas.data[0].id)
        }
        //console.log(loginDatas)
    }

    const update = async () => {
        if (nama_blud === '' || email === '') {
            notification.open({
                message: 'Gagal Menyimnpan',
                description:
                    'Form tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            console.log(id_blud)
            let datas = {
                id: id_blud,
                payload: {
                    nama_blud,
                    alamat_blud,
                    nama_kepala_blud,
                    nip_kepala_blud,
                    logo,
                }
            }
            const apiurl = 'updateblud';
            console.log(apiurl)
            let update = await createupdate(datas, apiurl)
            if (update === 1) {
                notification.open({
                    message: 'Data Berhasil disimpan',
                    description:
                        '',
                    icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
                });
                getBludbyId(id_blud)
            } else {
                notification.open({
                    message: 'Gagal Menyimpan Data',
                    description:
                        '',
                    icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
                });
            }
        }
    }


    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: '100%',
            }}
        >
            <Card
                title="Profil Instansi"
                style={{ width: '100%', borderWidth: 0 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            />
            <Row style={{ width: '100%' }}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={logo} width='300' />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <InputBoxAbove>
                        <Label>Kode BLUD</Label>
                        <Input placeholder="Kode BLUD" value={kode_blud} onChange={e => setNamaBlud(e.target.value)}  disabled/>
                    </InputBoxAbove>
                    <InputBoxCenter>
                        <Label>Nama BLUD</Label>
                        <Input placeholder="Nama BLUD" value={nama_blud} onChange={e => setNamaBlud(e.target.value)} />
                    </InputBoxCenter>
                    <InputBoxCenter>
                        <Label>Alamat Lengkap BLUD</Label>
                        <Input placeholder="Alamat Lengkap" value={alamat_blud} onChange={e => setAlamatBlud(e.target.value)} />
                    </InputBoxCenter>
                    <InputBoxCenter>
                        <Label>Nama Kepala BLUD</Label>
                        <Input placeholder="Nama Kepala BLUD" value={nama_kepala_blud} onChange={e => setNamaKepalaBlud(e.target.value)} />
                    </InputBoxCenter>
                    <InputBoxCenter>
                        <Label>Nomor Induk Pegawai (NIP) Kepala BLUD </Label>
                        <Input placeholder="NIP Kepala BLUD" value={nip_kepala_blud} onChange={e => setNipKepalaBlud(e.target.value)} />
                    </InputBoxCenter>
                    <InputBoxCenter>
                        <Label>Email</Label>
                        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} disabled />
                    </InputBoxCenter>
                    <InputBoxCenter>
                        <Label>Username </Label>
                        <Input placeholder="Nomor telp" value={username} onChange={e => setUsername(e.target.value)} disabled />
                    </InputBoxCenter>
                    <InputBoxBottom>
                        <Label>Link Logo (Format PNG)</Label>
                        <Input placeholder="dispmnaker" value={logo} onChange={e => setLogo(e.target.value)} />
                    </InputBoxBottom>
                    <Button onClick={update} >Simpan </Button>
                </Col>
            </Row>
        </Content>
    )
}

export default Blud;