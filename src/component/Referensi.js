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

const InputBox = styled.input`
    border: 1px solid #a5b1c2;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
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
    font-size: 12px;
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

function Referensi() {

    const [modal, setModal] = useState(false)
    const [id, setId] = useState('')
    const [kode, setkode] = useState('')
    const [jenis, setJenis] = useState('')
    const [deskripsi, setDeskripsi] = useState('')
    const [isUpdate, setIsUpdate] = useState(false)

    const [listReferensi, setListReferensi] = useState([])


    useEffect(() => {
        getreferensi()
    }, []);



    const modalTrigger = () => {
        setModal(!modal)
    }

    const getreferensi= async () => {
        const data = []
        const url = 'getreferensi'
        let referensi = await getall(url)
        let data_length = referensi.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: referensi[i].id,
                kode: referensi[i].kode,
                deskripsi: referensi[i].deskripsi,
                jenis: referensi[i].jenis,
            })
        }
        setListReferensi(data)
    }

    const removereferensi = async (idx) => {
        const url = 'deletereferensi'
        console.log(idx)
        const hapus = await remove(idx, url)
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getreferensi()
        }
    }

    const create = async () => {
        let datas = {
            kode,
            jenis,
            deskripsi
        }
        const apiurl = 'createreferensi';
        console.log(apiurl)
        let createreferensi = await createupdate(datas, apiurl)
        if (createreferensi === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
           getreferensi()
            modalTrigger()
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

    const update = async () => {
            let datas = {
                id,
                kode,
                jenis,
                deskripsi
            }
            const apiurl = 'updatereferensi';
            console.log(apiurl)
            let updatereferensi = await createupdate(datas, apiurl)
            if (updatereferensi === 1) {
                notification.open({
                    message: 'Data Berhasil disimpan',
                    description:
                        '',
                    icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
                });
                //getpegawai()
                //getkoderekening()
                modalTrigger()
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

    const resetForm = () => {
       setkode('')
       setDeskripsi('')
       setJenis('')
    }

    const columns = [
        {
            title: 'Nomor',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Kode',
            key: 'kode',
            dataIndex: 'kode'
        },
        {
            title: 'Jenis',
            key: 'jenis',
            dataIndex: 'jenis'
        },
        {
            title: 'Deskripsi',
            key: 'deskripsi',
            dataIndex: 'deskripsi'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    {/* <Button key="edit" onClick={() => getkoderekeningbyid(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<InfoCircleOutlined />} >Edit</Button> */}
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => removereferensi(record.id)}
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

    const createorupdate = () => {
        isUpdate ? update() : create()
    }

    const createnew = async () => {
        modalTrigger()
        setIsUpdate(false)
        //resetForm()
    }

    const onChangeJenis = value => {
        setJenis(value)
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

            <Card
                title="Referensi Kode Rekening"
                extra={<Button type="dashed" onClick={createnew}>Tambah Referensi</Button>}
                style={{ width: '100%', marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            >
            </Card>
            <Table columns={columns} dataSource={listReferensi} />

            <Modal
                title="Edit Kode Rekening"
                centered
                visible={modal}
                onOk={createorupdate}
                onCancel={modalTrigger}
                width={1000}
            >
                <InputBoxAbove >
                    <Label>Kode Rekening</Label>
                    <Inputx placeholder="Kode" value={kode} onChange={e => setkode(e.target.value)} />
                </InputBoxAbove>
                <InputBoxCenter>
                    <Label>Deskripsi</Label>
                    <Inputx placeholder="Deskripsi" value={deskripsi} onChange={e => setDeskripsi(e.target.value)} />
                </InputBoxCenter>
                <InputBoxBottom>
                    <Label>Jenis Kode Rekening</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Pilih Jabatan"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeJenis}
                        value={jenis}
                    >
                        <Option value='akun'>Nomor Akun</Option>
                        <Option value='kelompok'>Kelompok</Option>
                        <Option value='jenis'>Jenis</Option>
                        <Option value='objek'>Objek</Option>
                        <Option value='rincianobjek'>Rincian Objek</Option>
                    </Select>
                </InputBoxBottom>
            </Modal>
        </Content>
    )
}

export default Referensi;



