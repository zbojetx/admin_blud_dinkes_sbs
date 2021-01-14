import React, { useState, useEffect } from 'react';
import { Layout, PageHeader, Row, Col, Card, Modal, Button, Select, notification, Table, Popconfirm } from 'antd';
import {
   CheckCircleOutlined,
   CloseCircleOutlined,
   DeleteOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createupdate, getall, remove, getbyid } from '../api/api';
import styled from 'styled-components';


const { Header, Sider, Content } = Layout;
const { Option } = Select;

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

const Judul = styled.input`
    width: 100%;
    border: 0px;
    font-family: 'Montserrat', sans-serif;
    margin-top: 20px;
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

const Buttonx = styled.button`
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

const Inputx = styled.input`
    width: 100%;
    border: 0px;
    font-family: 'Montserrat', sans-serif;
    &:focus{
        outline: none;
    }
`;

function Attr() {

    const [modal, setModal] = useState(false)
    const [nama_attr, setNamaAttr] = useState('')
    const [jenis_attr, setJenisAttr] = useState('')
    const [listSumberDana, setListSumberDana] = useState([])
    const [listEselon, setListEselon] = useState([])
    const [listPangkat, setListPangkat] = useState([])
    const [listJabatan, setListJabatan] = useState([])
    const [listFormat, setListFormat] = useState([])
    const [listSatuan, setListSatuan] = useState([])

    useEffect(() => {
        attrBank()
        attrEselon()
        attrJabatan()
        attrPangkat()
        attrTahun()
        attrSatuan()
    }, [])

    const modelTrigger = () => {
        setModal(!modal)
    }

    const attrBank = async () => {
        const url = 'getattrbyjenis'
        const jenis = 'Sumber'
        const data = []
        let attrbank = await getbyid(jenis, url)
        console.log(attrbank)
        let data_length = attrbank.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: attrbank[i].id,
                nama: attrbank[i].nama_attr,
            })
        }
        setListSumberDana(data)
    }

    const attrEselon = async () => {
        const url = 'getattrbyjenis'
        const jenis = 'Eselon'
        let attreselon = await getbyid(jenis, url)
        const data = []
        let data_length = attreselon.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: attreselon[i].id,
                nama: attreselon[i].nama_attr,
            })
        }
        setListEselon(data)
    }
    const attrPangkat = async () => {
        const url = 'getattrbyjenis'
        const jenis = 'Pangkat'
        let attrpangkat = await getbyid(jenis, url)
        const data = []
        let data_length = attrpangkat.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: attrpangkat[i].id,
                nama: attrpangkat[i].nama_attr,
            })
        }
        setListPangkat(data)
    }

    const attrJabatan = async () => {
        const url = 'getattrbyjenis'
        const jenis = 'Jabatan'
        let attrjabatan = await getbyid(jenis, url)
         const data = []
        let data_length = attrjabatan.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: attrjabatan[i].id,
                nama: attrjabatan[i].nama_attr,
            })
        }
        setListJabatan(data)
    }

    const attrTahun = async () => {
        const url = 'getattrbyjenis'
        const jenis = 'Tahun'
        let attrformat = await getbyid(jenis, url)
         const data = []
        let data_length = attrformat.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: attrformat[i].id,
                nama: attrformat[i].nama_attr,
            })
        }
        setListFormat(data)
    }

    const attrSatuan = async () => {
        const url = 'getattrbyjenis'
        const jenis = 'Satuan'
        let attrsatuan = await getbyid(jenis, url)
         const data = []
        let data_length = attrsatuan.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: attrsatuan[i].id,
                nama: attrsatuan[i].nama_attr,
            })
        }
        setListSatuan(data)
    }

    const onChangeJenisAttr = value => {
        setJenisAttr(value)
        console.log(value)
    }

    const createAttr = async() => {
        let datas = {
           nama_attr,
           jenis_attr
        }
        let apiUrl = 'createattr'
        const createattr = await createupdate(datas, apiUrl)
        if (createattr === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            attrBank()
            attrEselon()
            attrJabatan()
            attrPangkat()
            attrTahun()
            attrSatuan()
            setJenisAttr('')
            setNamaAttr('')
            modelTrigger()
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }

    const removeattr = async (id) => {
        const url = 'deleteattr'
        const hapus = await remove(id, url)
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            attrBank()
            attrEselon()
            attrJabatan()
            attrPangkat()
            attrTahun()
            attrSatuan()
        }
    }

    const columns = [
        {
            title: 'No',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Nama Atribut',
            key: 'nama',
            dataIndex: 'nama'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => removeattr(record.id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="hapus" style={{ marginLeft: 10 }} type="danger" icon={<DeleteOutlined />} >Hapus</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];


    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 'auto',
               // height:'auto'
            }}
        >
            <Card
                title="Atribut"
                //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                extra={<Button type="dashed" onClick={modelTrigger}>Tambah Atribut </Button>}
                style={{ width: '100%', borderWidth: 0 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            />
            <Row style={{ width: '100%' }}>
                <Col xs={12} sm={12} md={12} lg={12} xl={8} style={{ padding: 10 }}>
                    <Card
                        title="Eselon"
                        //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                        style={{ width: '100%', borderWidth: 0 }}
                        headStyle={{ color: 'black', backgroundColor: '#dfe4ea', fontWeight: 'bold', fontSize: 14 }}
                    />
                     <Table columns={columns} dataSource={listEselon} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={8} style={{ padding: 10 }}>
                    <Card
                        title="Pangkat / Golongan"
                        //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                        style={{ width: '100%', borderWidth: 0 }}
                        headStyle={{ color: 'black', backgroundColor: '#dfe4ea', fontWeight: 'bold', fontSize: 14 }}
                    />
                     <Table columns={columns} dataSource={listPangkat} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={8} style={{ padding: 10 }}>
                    <Card
                        title="Jabatan"
                        //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                        style={{ width: '100%', borderWidth: 0 }}
                        headStyle={{ color: 'black', backgroundColor: '#dfe4ea', fontWeight: 'bold', fontSize: 14 }}
                    />
                     <Table columns={columns} dataSource={listJabatan} />
                </Col>
            </Row>
            <Row style={{ width: '100%' }}>
                <Col xs={12} sm={12} md={12} lg={12} xl={8} style={{ padding: 10 }}>
                    <Card
                        title="Sumber Dana"
                        //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                        style={{ width: '100%', borderWidth: 0 }}
                        headStyle={{ color: 'black', backgroundColor: '#dfe4ea', fontWeight: 'bold', fontSize: 14 }}
                    />
                    <Table columns={columns} dataSource={listSumberDana} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={8} style={{ padding: 10 }}>
                    <Card
                        title="Tahun Anggaran"
                        //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                        style={{ width: '100%', borderWidth: 0 }}
                        headStyle={{ color: 'black', backgroundColor: '#dfe4ea', fontWeight: 'bold', fontSize: 14 }}
                    />
                     <Table columns={columns} dataSource={listFormat} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={8} style={{ padding: 10 }}>
                    <Card
                        title="Satuan"
                        //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                        style={{ width: '100%', borderWidth: 0 }}
                        headStyle={{ color: 'black', backgroundColor: '#dfe4ea', fontWeight: 'bold', fontSize: 14 }}
                    />
                     <Table columns={columns} dataSource={listSatuan} />
                </Col>
            </Row>


            <Modal
                title="Tambah Atribut"
                centered
                visible={modal}
                onOk={createAttr}
                onCancel={modelTrigger}
                width={1000}
            >
                <InputBoxAbove style={{ backgroundColor: '#f7d794' }}>
                    <Label>Data Pegawai</Label>
                </InputBoxAbove>
                <InputBoxCenter>
                    <Label>Tingkat menurut peraturan perjalanan</Label>
                    <Select
                        showSearch
                        placeholder="Tingkat menurut peraturan perjalanan"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeJenisAttr}
                        value={jenis_attr}
                    >
                        <Option value="Sumber">Sumber Dana</Option>
                        <Option value="Eselon">Eselon</Option>
                        <Option value="Pangkat">Pangkat Golongan</Option>
                        <Option value="Jabatan">Jabatan</Option>
                        <Option value="Tahun">Tahun Anggaran</Option>
                        <Option value="Satuan">Satuan</Option>
                    </Select>
                </InputBoxCenter>
                <InputBoxBottom>
                    <Label>Nama Atribut</Label>
                    <Inputx placeholder="Nama Atribut" value={nama_attr} onChange={e => setNamaAttr(e.target.value)} />
                </InputBoxBottom>
            </Modal>

        </Content >
    )
}

export default Attr;