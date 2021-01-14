import React, { useEffect, useState, useRef } from 'react';
import { Form, Layout, Row, Col, Card, Modal, Button, Popconfirm, Table, Input, notification, Select } from 'antd';
import {
    SyncOutlined,
    PlusCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createupdate, getall, remove, getbyid, getallpost } from '../api/api';
import { Typography } from 'antd';
import { Link, browserHistory } from 'react-router';
import { isLogin } from '../reducer/LocalStoradge';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import { ComponentToPrint } from './print/Printst'
import { ComponentToPrintKwitansi } from './print/Printkwintansi';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';
import moment from 'moment';
moment.locale('id')

const { Header, Sider, Content } = Layout;

const Label = styled.p`
    margin-bottom: 2px;
    font-weight: bold;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
`;


function Program() {
    const [modal, setModal] = useState(false)
    const [modalKegiatan, setModalKegiatan] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [id_program, setIdProgram] = useState('')
    const [kode_program, setKodeProgram] = useState('')
    const [nama_program, setNamaProgram] = useState('')
    const [kode_kegiatan, setkodeKegiatan] = useState('')
    const [nama_kegiatan, setNamaKegiatan] = useState('')

    const [listProgram, setListProgram] = useState([])
    const [listKegiatan, setListKegiatan] = useState([])

    useEffect(() => {
        getallprogram()
    }, [])

    const modalTrigger = () => {
        setModal(!modal)
    }

    const modalKegiatanTrigger = () => {
        setModalKegiatan(!modalKegiatan)
    }

    const getallprogram = async () => {
        const data = []
        const url = 'getprogram'
        let program = await getall(url)
        let data_length = program.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: program[i].id,
                nama_program: program[i].nama_program,
                kode_program: program[i].kode_program,
            })
        }
        setListProgram(data)
    }

    const getprogrambyid = async (id) => {
        setIdProgram(id)
        setIsUpdate(true)
        const url = 'programbyid'
        let data = await getbyid(id, url)
        //console.log(sppdbyid)
        setKodeProgram(data[0].kode_program)
        setNamaProgram(data[0].nama_program)
        modalTrigger()
    }


    const create = async () => {
        let datas = {
            kode_program,
            nama_program,
        }
        const apiurl = 'createprogram'
        console.log(apiurl)
        let createpegawai = await createupdate(datas, apiurl)
        if (createpegawai === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getallprogram()
            //setPengikut('')
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
            id: id_program,
            payload: {
                kode_program,
                nama_program,
            }
        }
        const apiurl = 'updateprogram'
        console.log(apiurl)
        let createpegawai = await createupdate(datas, apiurl)
        if (createpegawai === 1) {
            notification.open({
                message: 'Data Berhasil diperbaharui',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getallprogram()
            //setPengikut('')
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }

    const hapus = async (idx) => {
        const url = 'deleteprogram'
        const hapus = await remove(idx, url)
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getallprogram()
        }
    }

    const createkegiatan = async () => {
        let datas = {
            kode_program,
            kode_kegiatan,
            nama_kegiatan
        }
        const apiurl = 'createkegiatan'
        console.log(apiurl)
        let createpegawai = await createupdate(datas, apiurl)
        if (createpegawai === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getkegiatanbyprogram(kode_program)
            //setPengikut('')
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }

    const getkegiatanbyprogram = async (kode) => {
        setKodeProgram(kode)
        let data = []
        const url = 'kegiatanbyprogram'
        let datax = await getbyid(kode, url)

        let data_length = datax.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: datax[i].id,
                nama_kegiatan : datax[i].nama_kegiatan,
                kode_kegiatan : datax[i].kode_kegiatan,
            })
        }
        //console.log(sppdbyid)
        setListKegiatan(data)
        if(modalKegiatan === true){

        }else{
            modalKegiatanTrigger()
        }
    }

    const hapuskegiatan = async (idx) => {
        const url = 'deletekegiatan'
        const hapus = await remove(idx, url)
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getkegiatanbyprogram(kode_program)
        }
    }


    const createorupdate = () => {
        isUpdate ? update() : create()
    }


    const createnew = async () => {
        modalTrigger()
        setIsUpdate(false)
        resetForm()
    }

    const resetForm = () => {
        setKodeProgram('')
        setNamaProgram('')
    }

    const columns = [
        {
            title: 'No',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Kode Program',
            key: 'kode_program',
            dataIndex: 'kode_program'
        },
        {
            title: 'Nama Program',
            key: 'nama_program',
            dataIndex: 'nama_program'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button key="edit" onClick={() => getprogrambyid(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<EditOutlined />} >Edit</Button>
                    <Button key="kegiatan" onClick={() => getkegiatanbyprogram(record.kode_program)} style={{ marginLeft: 10 }} type="default" icon={<PlusCircleOutlined />} >Kegiatan</Button>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => hapus(record.id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="hapus" style={{ marginLeft: 10 }} type="danger" icon={<DeleteOutlined />} >Hapus</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ]

    const columnsKegiatan = [
        {
            title: 'No',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Kode Kegiatan',
            key: 'kode_kegiatan',
            dataIndex: 'kode_kegiatan'
        },
        {
            title: 'Nama Kegiatan',
            key: 'nama_kegiatan',
            dataIndex: 'nama_kegiatan'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => hapuskegiatan(record.id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="hapus" style={{ marginLeft: 10 }} type="danger" icon={<DeleteOutlined />} ></Button>
                    </Popconfirm>
                </span>
            ),
        },
    ]

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
                title="Master Data Program"
                extra={<Button type="dashed" onClick={createnew}> Tambah Program</Button>}
                style={{ width: '100%', borderWidth: 0, marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            />

            <Table columns={columns} dataSource={listProgram} />

            <Modal
                title="Program"
                centered
                visible={modal}
                onOk={createorupdate}
                onCancel={modalTrigger}
            //width={1000}
            >

                <Label>Kode Program</Label>
                <Input placeholder="Kode Program" value={kode_program} onChange={e => setKodeProgram(e.target.value)} disabled={isUpdate ? true : false} />

                <Label style={{ marginTop: 20 }}>Nama Program</Label>
                <Input placeholder="Nama Program" value={nama_program} onChange={e => setNamaProgram(e.target.value)} />

            </Modal>

            <Modal
                title="Kegiatan"
                centered
                visible={modalKegiatan}
                //onOk={createkegiatan}
                onCancel={modalKegiatanTrigger}
                width={1000}
                footer={null}
            >

                <Row style={{ width: '100%', marginBottom: 20, backgroundColor: '#0984e3' }} >
                    <Col xs={24} sm={24} md={6} lg={12} xl={12} style={{ padding: 10 }}>
                        <Label style={{ color: 'white' }}>Kode Kegiatan</Label>
                        <Input value={kode_kegiatan} onChange={e => setkodeKegiatan(e.target.value)} />
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={12} xl={12} style={{ padding: 10 }}>
                        <Label style={{ color: 'white' }}>Nama Kegiatan</Label>
                        <Input value={nama_kegiatan} onChange={e => setNamaKegiatan(e.target.value)} />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: 10 }}>
                        <Button block type="primary" onClick={createkegiatan}> Simpan</Button>
                    </Col>
                </Row>


                <Table columns={columnsKegiatan} dataSource={listKegiatan} />
            </Modal>
        </Content>
    )

}

export default Program

