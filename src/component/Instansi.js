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

function Instansi() {

    const [nama_instansi, setNamaInstansi] = useState('');
    const [alamat, setAlamat] = useState('');
    const [kota, setKota] = useState('')
    const [telp, setTelp] = useState('');
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
    const [logo_url, setLogo] = useState('')

    useEffect(() => {
        //localStorage.clear()
        getUser()
    }, []);

    const getUser = async() => {
        let url = 'instansi'
        let data = await getall(url)
        console.log(data)
        setNamaInstansi(data[0].nama_instansi)
        setAlamat(data[0].alamat)
        setKota(data[0].kota)
        setLogo(data[0].logo_url)
        setEmail(data[0].email)
        setTelp(data[0].telp)
        setWebsite(data[0].website)
    }

    const update = async () => {
        if (nama_instansi === '' || email === '') {
            notification.open({
                message: 'Gagal Menyimnpan',
                description:
                    'Form tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
              nama_instansi,
              alamat,
              kota,
              telp,
              email,
              logo_url,
              website
            }
            const apiurl = 'updateinstansi';
            console.log(apiurl)
            let update = await createupdate(datas, apiurl)
            if (update === 1) {
                notification.open({
                    message: 'Data Berhasil disimpan',
                    description:
                        '',
                    icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
                });
                getUser()
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
                <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                    <img src={logo_url} width='300' />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <InputBoxAbove>
                        <Label>Nama Instansi</Label>
                        <Input placeholder="Nama Instansi" value={nama_instansi} onChange={e => setNamaInstansi(e.target.value)} />
                    </InputBoxAbove>
                    <InputBoxCenter>
                        <Label>Alamat Lengkap Instansi</Label>
                        <Input placeholder="Alamat Lengkap" value={alamat} onChange={e => setAlamat(e.target.value)}  />
                    </InputBoxCenter>
                    <InputBoxCenter>
                        <Label>Kabupaten / Kota</Label>
                        <Input placeholder="Kab / Kota" value={kota} onChange={e => setKota(e.target.value)}  />
                    </InputBoxCenter>
                    <InputBoxCenter>
                        <Label>Nomor Telpon / Fax</Label>
                        <Input placeholder="Nomor telp" value={telp} onChange={e => setTelp(e.target.value)} />
                    </InputBoxCenter>
                    <InputBoxCenter>
                        <Label>Email</Label>
                        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </InputBoxCenter>
                    <InputBoxCenter>
                        <Label>Website</Label>
                        <Input placeholder="Website" value={website} onChange={e => setWebsite(e.target.value)} />
                    </InputBoxCenter>
                    <InputBoxBottom>
                        <Label>Link Logo (Format PNG)</Label>
                        <Input placeholder="dispmnaker" value={logo_url} onChange={e => setLogo(e.target.value)} />
                    </InputBoxBottom>
                    <Button onClick={update} >Simpan </Button>
                </Col>
            </Row>
        </Content>
    )
}

export default Instansi;