import React, { useEffect, useState, useRef } from 'react';
import { Form, Layout, Row, Col, Card, Modal, Button, Popconfirm, Table, InputNumber, notification, Select } from 'antd';
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
import NumberFormat from 'react-number-format'
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';
import moment from 'moment';
moment.locale('id')

const { Header, Sider, Content } = Layout;

const { Option } = Select;

const Label = styled.p`
    margin-bottom: 2px;
    font-weight: bold;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
`;


function Program() {
    const [modal, setModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [tahun_anggaran, setTahunAnggaran] = useState('')
    const [total_pagu, setTotalPagu] = useState('')

    const [listPagu, setListPagu] = useState([])
    const [listTahunAnggaran, setlistTahunAnggaran] = useState([])

    useEffect(() => {
        getallpagu()
        attr()
    }, [])

    const modalTrigger = () => {
        setModal(!modal)
    }

    const attr = async () => {
        const url = 'getattrbyjenis'
        const jenis = 'Tahun'
        let attrformat = await getbyid(jenis, url)
        setlistTahunAnggaran(attrformat)
    }


    const getallpagu = async () => {
        const data = []
        const url = 'gettotalpagu'
        let pagu = await getall(url)
        let data_length = pagu.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: pagu[i].id,
                tahun_anggaran: pagu[i].tahun_anggaran,
                total_pagu: pagu[i].total_pagu,
            })
        }
        setListPagu(data)
    }

    const getpagubyid = async (id) => {
        setIsUpdate(true)
        const url = 'totalpagubyid'
        let data = await getbyid(id, url)
        //console.log(sppdbyid)
        setTahunAnggaran(data[0].tahun_anggaran)
        setTotalPagu(data[0].total_pagu)
        modalTrigger()
    }


    const create = async () => {
        let datas = {
            tahun_anggaran,
            total_pagu,
        }
        const apiurl = 'createtotalpagu'
        console.log(apiurl)
        let createpegawai = await createupdate(datas, apiurl)
        if (createpegawai === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getallpagu()
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
            tahun_anggaran,
            total_pagu,
        }
        const apiurl = 'updatetotalpagu'
        console.log(apiurl)
        let createpegawai = await createupdate(datas, apiurl)
        if (createpegawai === 1) {
            notification.open({
                message: 'Data Berhasil diperbaharui',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getallpagu()
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
        const url = 'deletetotalpagu'
        const hapus = await remove(idx, url)
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getallpagu()
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
        setTahunAnggaran('')
        setTotalPagu('')
    }

    const columns = [
        {
            title: 'No',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Tahun Anggaran',
            key: 'tahun_anggaran',
            dataIndex: 'tahun_anggaran'
        },
        {
            title: 'Total Pagu',
            key: 'total_pagu',
            render: (text, record) => (
                <span>
                    <NumberFormat thousandSeparator={true} displayType={'text'} value={record.total_pagu} />
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button key="edit" onClick={() => getpagubyid(record.tahun_anggaran)} style={{ marginLeft: 10 }} type="primary" icon={<EditOutlined />} >Edit</Button>
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

    const onChangeTahunAnggaran = value => {
        setTahunAnggaran(value)
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
                title="Master Pagu"
                extra={<Button type="dashed" onClick={createnew}> Insert Pagu</Button>}
                style={{ width: '100%', borderWidth: 0, marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            />

            <Table columns={columns} dataSource={listPagu} />

            <Modal
                title="Program"
                centered
                visible={modal}
                onOk={createorupdate}
                onCancel={modalTrigger}
            //width={1000}
            >

                <Label>Tahun Anggaran</Label>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Pilih Tahun Anggaran"
                    optionFilterProp="children"
                    style={{ width: '100%', borderWidth: 0 }}
                    onChange={onChangeTahunAnggaran}
                    value={tahun_anggaran}
                >
                    <Option value="">Tahun Anggaran</Option>
                    {listTahunAnggaran.map((data, index) =>
                        <Option value={data.nama_attr}>{data.nama_attr}</Option>
                    )}
                </Select>

                <Label style={{ marginTop: 20 }}>Total Pagu</Label>
                <InputNumber
                    value={total_pagu}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                    onChange={value => setTotalPagu(value)}
                />
            </Modal>

        </Content>
    )

}

export default Program

