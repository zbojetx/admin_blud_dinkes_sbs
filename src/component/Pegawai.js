import React, { useEffect, useState } from 'react';
import { Layout, Select, Row, Col, Card, Modal, Button, Popconfirm, Table, Input, notification, Form, Radio } from 'antd';
import {
    DeleteOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createupdate, getall, remove, getbyid } from '../api/api';
import { Typography } from 'antd';
import { Link, browserHistory } from 'react-router';
import { isLogin } from '../reducer/LocalStoradge'
import styled from 'styled-components';


const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
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

function Pelayanan() {

    const [modal, setModal] = useState(false)
    const [listPegawai, setListPegawai] = useState([])
    const [id, setId] = useState('')
    const [nip, setNip] = useState('')
    const [nama_pegawai, setNamaPegawai] = useState('')
    const [email, setEmail] = useState('')
    const [no_hp, setNoHp] = useState('')
    const [pangkat_gol, setPangkatGol] = useState('')
    const [jabatan, setJabatan] = useState('')
    const [eselon, setEselon] = useState('')
    const [bank, setBank] = useState('')
    const [nomor_rekening, setNomorRekening] = useState('')
    const [jabatan_plt, setJabatanPlt] = useState('')
    const [password, setPassword] = useState('')
    const [isUpdate, setIsUpdate] = useState('')
    const [listBank, setListBank] = useState([])
    const [listEselon, setListEselon] = useState([])
    const [listPangkat, setListPangkat] = useState([])
    const [listJabatan, setListJabatan] = useState([])


    useEffect(() => {
        getpegawai()
        attrBank()
        attrEselon()
        attrJabatan()
        attrPangkat()
    }, []);



    const modelTrigger = () => {
        setModal(!modal)
    }

    const getPegawaiById = async (id) => {
        const url = 'getpegawaibyid'
        let pegawaibyid = await getbyid(id, url)
        console.log(pegawaibyid)
        setId(id)
        setNip(pegawaibyid[0].nip)
        setNamaPegawai(pegawaibyid[0].nama_pegawai)
        setEmail(pegawaibyid[0].email)
        setNoHp(pegawaibyid[0].no_hp)
        setPangkatGol(pegawaibyid[0].pangkat_gol)
        setJabatan(pegawaibyid[0].jabatan)
        setEselon(pegawaibyid[0].eselon)
        setBank(pegawaibyid[0].bank)
        setNomorRekening(pegawaibyid[0].nomor_rekening)
        setJabatanPlt(pegawaibyid[0].jabatan_plt)
        setIsUpdate(true)
        modelTrigger()
    }

    const attrBank = async () => {
        const url = 'getattrbyjenis'
        const jenis = 'Bank'
        let attrbank = await getbyid(jenis, url)
        setListBank(attrbank)
    }

    const attrEselon = async () => {
        const url = 'getattrbyjenis'
        const jenis = 'Eselon'
        let attreselon = await getbyid(jenis, url)
        setListEselon(attreselon)
    }
    const attrPangkat = async () => {
        const url = 'getattrbyjenis'
        const jenis = 'Pangkat'
        let attrpangkat = await getbyid(jenis, url)
        setListPangkat(attrpangkat)
    }

    const attrJabatan = async () => {
        const url = 'getattrbyjenis'
        const jenis = 'Jabatan'
        let attrjabatan = await getbyid(jenis, url)
        setListJabatan(attrjabatan)
    }

    const getpegawai = async () => {
        const data = []
        const url = 'getpegawai'
        let pegawai = await getall(url)

        let data_length = pegawai.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: pegawai[i].id,
                nama_pegawai: pegawai[i].nama_pegawai,
                nip: pegawai[i].nip,
                jabatan: pegawai[i].jabatan,
                eselon: pegawai[i].eselon,
            })
        }
        setListPegawai(data)

    }

    const removepagawai = async (id) => {
        const url = 'deletepegawai'
        const hapus = await remove(id, 'deletepegawai')
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getpegawai()
        }
    }

    const create = async () => {
        if (nip === '' || nama_pegawai === '') {
            notification.open({
                message: 'Gagal Menyimnpan',
                description:
                    'Form tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
                nip,
                nama_pegawai,
                email,
                no_hp,
                pangkat_gol,
                jabatan,
                eselon,
                bank,
                nomor_rekening,
                jabatan_plt,
                password,
            }
            console.log(isUpdate)
            const apiurl = 'createpegawai';
            console.log(apiurl)
            let createpegawai = await createupdate(datas, apiurl)
            if (createpegawai === 1) {
                notification.open({
                    message: 'Data Berhasil disimpan',
                    description:
                        '',
                    icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
                });
                getpegawai()
                modelTrigger()
                resetForm()
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

    const update = async () => {
        if (nip === '' || nama_pegawai === '') {
            notification.open({
                message: 'Gagal Menyimnpan',
                description:
                    'Form tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
                id,
                nip,
                nama_pegawai,
                email,
                no_hp,
                pangkat_gol,
                jabatan,
                eselon,
                bank,
                nomor_rekening,
                jabatan_plt,
                password,
            }
            console.log(isUpdate)
            const apiurl = 'updatepegawai';
            console.log(apiurl)
            let createpegawai = await createupdate(datas, apiurl)
            if (createpegawai === 1) {
                notification.open({
                    message: 'Data Berhasil disimpan',
                    description:
                        '',
                    icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
                });
                getpegawai()
                modelTrigger()
                resetForm()
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

    const createorupdate = () => {
        isUpdate ? update() : create()
    }

    const createnew = async () => {
        modelTrigger()
        setIsUpdate(false)
        resetForm()
    }

    const resetForm = () => {
        setNip('')
        setNamaPegawai('')
        setEmail('')
        setNoHp('')
        setPangkatGol('')
        setJabatan('')
        setEselon('')
        setBank('')
        setNomorRekening('')
        setJabatanPlt('')
    }

    const columns = [
        {
            title: 'Nomor',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Nama',
            key: 'nama_pegawai',
            dataIndex: 'nama_pegawai'
        },
        {
            title: 'NIP',
            key: 'nip',
            dataIndex: 'nip'
        },
        {
            title: 'Jabatan',
            key: 'jabatan',
            dataIndex: 'jabatan'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button key="edit" onClick={() => getPegawaiById(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<InfoCircleOutlined />} >Edit</Button>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => removepagawai(record.id)}
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

    const onChangeJabatan = value => {
        setJabatan(value)
    }

    const onChangeBank = value => {
        setBank(value)
    }

    const onChangePangkat = value => {
        setPangkatGol(value)
    }

    const onChangeEselon= value => {
        setEselon(value)
    }


    return (
        <Content
            //className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: '100%',
            }}
        >

            <Card
                title="Pegawai"
                //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                extra={<Button type="dashed" onClick={createnew}>Tambah Pegawai </Button>}
                style={{ width: '100%', borderWidth: 0, marginBottom:20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20, }}
            />

            <Table columns={columns} dataSource={listPegawai} />

            <Modal
                title="Tambah Pegawai"
                centered
                visible={modal}
                onOk={createorupdate}
                onCancel={modelTrigger}
                width={1000}
            >
                <InputBoxAbove style={{ backgroundColor: '#f7d794' }}>
                    <Label>Data Personal</Label>
                </InputBoxAbove>
                <InputBoxCenter>
                    <Label>Nama Lengkap</Label>
                    <Inputx placeholder="Nama Lengkap" value={nama_pegawai} onChange={e => setNamaPegawai(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Email</Label>
                    <Inputx placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Nomor HP / WA</Label>
                    <Inputx placeholder="Nomor HP / WA" value={no_hp} onChange={e => setNoHp(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter style={{ backgroundColor: '#f7d794' }}>
                    <Label>Data Kepegawaian</Label>
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Nomor Induk Pegawai (NIP)</Label>
                    <Inputx placeholder="Nomor Induk Pegawai (NIP)" value={nip} onChange={e => setNip(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Pangkat / Golongan</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Pilih Jabatan"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangePangkat}
                        value={pangkat_gol}
                    >
                        {listPangkat.map((data, index) =>
                            <Option value={data.nama_attr}>{data.nama_attr}</Option>
                        )}
                    </Select>
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Jabatan</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Pilih Jabatan"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeJabatan}
                        value={jabatan}
                    >
                        {listJabatan.map((data, index) =>
                            <Option value={data.nama_attr}>{data.nama_attr}</Option>
                        )}
                    </Select>
                </InputBoxCenter>
                <InputBoxBottom>
                    <Label>Eselon</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Pilih Jabatan"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeEselon}
                        value={eselon}
                    >
                        {listEselon.map((data, index) =>
                            <Option value={data.nama_attr}>{data.nama_attr}</Option>
                        )}
                    </Select>
                </InputBoxBottom>
            </Modal>

        </Content>
    )
}

export default Pelayanan;



