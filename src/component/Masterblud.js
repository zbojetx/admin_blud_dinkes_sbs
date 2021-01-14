import React, { useEffect, useState, useRef } from 'react';
import { Form, Layout, Row, Col, Card, Modal, Button, Popconfirm, Table, Input, notification, Select, DatePicker, InputNumber, Divider } from 'antd';
import {
    DeleteOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined,
    PrinterOutlined,
    DollarCircleOutlined,
    EditOutlined,
    UserAddOutlined,
    StopOutlined,
    BulbOutlined,
    CalculatorOutlined,
    ReloadOutlined,
    SyncOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createupdate, getall, remove, getbyid, getallpost } from '../api/api';
import { Typography } from 'antd';
import { Link, browserHistory } from 'react-router';
import { isLogin } from '../reducer/LocalStoradge';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import { ComponentToPrint } from './print/Printsppd'
import NumberFormat from 'react-number-format'
import { ComponentToPrintKwitansi } from './print/Printkwintansi'
import moment from 'moment';
moment.locale('id')


const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

;

const Label = styled.p`
    margin-bottom: 2px;
    font-weight: bold;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
`;



function Sppd() {
    moment.locale('id')
    const [form] = Form.useForm();
    const [modal, setModal] = useState(false)
    const [modalPrintSppd, setModalPrintSppd] = useState(false)
    const [modalPrintKwitansi, setModalPrintKwitansi] = useState(false)
    const [modalPagu, setModalPagu] = useState(false)
    const [listBlud, setListBlud] = useState([])
    const [id, setId] = useState('')
    const [isUpdate, setIsUpdate] = useState('')

    const [id_blud, setIdBlud] = useState('')
    const [kode_blud, setKodeBlud] = useState('')
    const [tahun_anggaran, setTahunAnggaran] = useState('')
    const [pagu, setPagu] = useState('')

    const [listTahunAnggaran, setlistTahunAnggaran] = useState([])
    const [listPagu, setListPagu] = useState([])

    const componentRef = useRef();


    useEffect(() => {
        getblud()
        attr()
    }, []);



    const modalTrigger = () => {
        setModal(!modal)
    }

    const modalTriggerPagu = async (kode) => {
        await setKodeBlud(kode)
        await getPaguById(kode)
        setModalPagu(!modalPagu)
    }

    const getblud = async () => {
        const data = []
        const url = 'getblud'
        let blud = await getall(url)
        let data_length = blud.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: blud[i].id,
                nama_blud: blud[i].nama_blud,
                kode_blud: blud[i].kode_blud,
                nama_kepala_blud: blud[i].nama_kepala_blud,
                status: blud[i].status,
                status_input: blud[i].status_input,
            })
        }
        setListBlud(data)
    }

    const getbludById = async (id) => {
        setIdBlud(id)
        const url = 'bludbyid'
        let data = await getbyid(id, url)
        //console.log(sppdbyid)
        setKodeBlud(data[0].kode_blud)
        modalTrigger()
    }

    const attr = async () => {
        const url = 'getattrbyjenis'
        const jenis = 'Tahun'
        let attrformat = await getbyid(jenis, url)
        setlistTahunAnggaran(attrformat)
    }


    const modalTriggerPrintSppd = async (id) => {
        await setId(id)
        console.log(id)
        setModalPrintSppd(!modalPrintSppd)
    }

    const modalTriggerPrintKwitansi = async (id) => {
        await setId(id)
        setModalPrintKwitansi(!modalPrintKwitansi)
    }

    const removeblud = async (id) => {
        const url = 'deleteblud'
        const hapus = await remove(id, url)
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getblud()
        }
    }



    const update = async (req, res) => {
        let datas = {
            id: id_blud,
            payload: {
                kode_blud
            },
        }
        const apiurl = 'updateblud'
        console.log(apiurl)
        let createpegawai = await createupdate(datas, apiurl)
        if (createpegawai === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getblud()
            modalTrigger()
            //resetForm()
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }

    const aktifblokir = async (data, data2) => {
        console.log(data2)
        let datas = {
            id: data,
            payload: {
                status: data2
            },
        }
        const apiurl = 'updateblud'
        console.log(apiurl)
        let update = await createupdate(datas, apiurl)
        if (update === 1) {
            notification.open({
                message: 'Perubahan berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getblud()
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }

    const bukainput = async (data, data2) => {
        console.log(data2)
        let datas = {
            id: data,
            payload: {
                status_input: data2
            },
        }
        const apiurl = 'updateblud'
        console.log(apiurl)
        let update = await createupdate(datas, apiurl)
        if (update === 1) {
            notification.open({
                message: 'Perubahan berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getblud()
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }

    const createPagu = async (id) => {
        let id_pagu = `${kode_blud}${tahun_anggaran}`
        let realisasi = 0;
        if (kode_blud === '') {
            notification.open({
                message: 'Kode BLUD tidak boleh kosong',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
                kode_blud,
                id_pagu,
                tahun_anggaran,
                pagu,
                realisasi,
            }
            const apiurl = 'createpagu'
            console.log(apiurl)
            let createpegawai = await createupdate(datas, apiurl)
            if (createpegawai === 1) {
                notification.open({
                    message: 'Data Berhasil disimpan',
                    description:
                        '',
                    icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
                });
                getPaguById(kode_blud)
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

    const getPaguById = async (kode) => {
        let data = []
        const url = 'pagubyid'
        let pagu = await getbyid(kode, url)
        let data_length = pagu.length
        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: pagu[i].id,
                tahun_anggaran: pagu[i].tahun_anggaran,
                pagu: pagu[i].pagu
            })
        }
        setListPagu(data)
        //modalTriggerPengikut()
    }

    const removepagu = async (idx) => {
        const url = 'deletepagu'
        const hapus = await remove(idx, url)
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getPaguById(kode_blud)
        }
    }


    const aktiforblockall = async (value) => {
        let status = value
        const datas = {
            aktif : status
        }
        const apiurl = 'aktiforblockblud'
        console.log(apiurl)
        let update = await createupdate(datas, apiurl)
        if (update === 1) {
            notification.open({
                message: 'Status berhasil di perbaharui',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getblud()
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }

    const openorcloseall = async (value) => {
        let status = value
        const datas = {
           open : status
        }
        const apiurl = 'openorcloseblud'
        console.log(apiurl)
        let update = await createupdate(datas, apiurl)
        if (update === 1) {
            notification.open({
                message: 'Status berhasil di perbaharui',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getblud()
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }

    const createnew = async () => {
        modalTrigger()
        setIsUpdate(false)
        //resetForm()
    }

    const columnsPagu = [
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
            title: 'Besaran Pagu',
            key: 'pagu',
            render: (text, record) => (
                <span>
                    <NumberFormat thousandSeparator={true} displayType={'text'} value={record.pagu} />
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => removepagu(record.id)}
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

    const columns = [
        {
            title: 'No',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Nama Blud',
            key: 'nama_blud',
            dataIndex: 'nama_blud'
        },
        {
            title: 'Kode Blud',
            key: 'kode_blud',
            dataIndex: 'kode_blud'
        },
        //
        {
            title: 'Nama Kepala',
            key: 'nama_kepala_blud',
            dataIndex: 'nama_kepala_blud'
        },
        {
            title: '#',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button key="edit" onClick={() => getbludById(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<EditOutlined />}>Kode</Button>
                    <Popconfirm
                        title="Blokir akun BLUD ini?"
                        onConfirm={() => aktifblokir(record.id, record.status === 1 ? '0' : '1')}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                    </Popconfirm>
                    {(() => {
                        if (record.status === '1') {
                            return (<Popconfirm
                                title="Blokir akun BLUD ini?"
                                onConfirm={() => aktifblokir(record.id, '0')}
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button key="hapus" style={{ marginLeft: 10 }} type="danger" icon={<StopOutlined />} >Blokir</Button>
                            </Popconfirm>)
                        } else {
                            return (<Popconfirm
                                title="Aktifkan akun BLUD ini?"
                                onConfirm={() => aktifblokir(record.id, '1')}
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button key="hapus" style={{ marginLeft: 10 }} type="primary" icon={<BulbOutlined />} >Aktifkan</Button>
                            </Popconfirm>)
                        }
                    })()}
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => removeblud(record.id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="hapus" style={{ marginLeft: 10 }} type="danger" icon={<DeleteOutlined />} >Hapus</Button>
                    </Popconfirm>
                </span>
            ),
        },
        {
            title: 'Penganggaran',
            key: 'action',
            render: (text, record) => (
                <span>
                    {(() => {
                        if (record.kode_blud === '' || null || undefined) {
                            return
                        } else {
                            return (<Button key="inputpagu" onClick={() => modalTriggerPagu(record.kode_blud)} style={{ marginLeft: 10 }} type="primary" icon={<CalculatorOutlined />} >Input Pagu</Button>)
                        }
                    })()}
                    {(() => {
                        if (record.status_input === '1') {
                            return (<Popconfirm
                                title="Nonaktifkan penginputan BLUD ini?"
                                onConfirm={() => bukainput(record.id, '0')}
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button key="hapus" style={{ marginLeft: 10 }} type="danger" icon={<StopOutlined />} >Tutup Input</Button>
                            </Popconfirm>)
                        } else {
                            return (<Popconfirm
                                title="Aktifkan penginputan BLUD ini?"
                                onConfirm={() => bukainput(record.id, '1')}
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button key="hapus" style={{ marginLeft: 10 }} type="primary" icon={<BulbOutlined />} >Buka Input</Button>
                            </Popconfirm>)
                        }
                    })()}
                </span>
            ),
        },
    ];



    const onChangeTahunAnggaran = value => {
        setTahunAnggaran(value)
    }

    const dateFormat = 'YYYY-MM-DD';
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
                title="Master Data BLUD"
                //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                extra={<Button type="dashed" onClick={getblud} icon={<SyncOutlined />}></Button>}
                style={{ width: '100%', borderWidth: 0, marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            >
                <Row style={{ width: '100%' }} >
                    <Col xs={24} sm={24} md={6} lg={8} xl={8} style={{ padding: 10 }}>
                        <div style={{ borderWidth: 1, borderColor: '#535c68', border: '1px solid #b2bec3', padding: 10, borderRadius: 5 }}>
                            <center><Label> Aktifasi Akun BLUD</Label></center>
                            <Divider />
                            <Row style={{ width: '100%' }}>
                                <Col  xs={24} sm={24} md={6} lg={12} xl={12} style={{ padding: 10 }}>
                                    <Button block type="primary"  onClick={() => aktiforblockall(1)} >Aktifkan semua akun</Button>
                                </Col>
                                <Col  xs={24} sm={24} md={6} lg={12} xl={12} style={{ padding: 10 }}>
                                     <Button block type="danger"  onClick={() => aktiforblockall(0)}>Blokir semua akun</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={8} xl={8} style={{ padding: 10 }}>
                    <div style={{ borderWidth: 1, borderColor: '#535c68', border: '1px solid #b2bec3', padding: 10, borderRadius: 5 }}>
                            <center><Label> Proses Penginputan Anggaran</Label></center>
                            <Divider />
                            <Row style={{ width: '100%' }}>
                                <Col  xs={24} sm={24} md={6} lg={12} xl={12} style={{ padding: 10 }}>
                                    <Button block type="primary"  onClick={() => openorcloseall(1)}>Buka semua akun</Button>
                                </Col>
                                <Col  xs={24} sm={24} md={6} lg={12} xl={12} style={{ padding: 10 }}>
                                     <Button block type="danger"  onClick={() => openorcloseall(0)}>Tutup semua akun</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8} style={{ padding: 10 }}>

                    </Col>
                </Row>
            </Card>

            <Table columns={columns} dataSource={listBlud} />

            <Modal
                title="Kode BLUD"
                centered
                visible={modal}
                onOk={update}
                onCancel={modalTrigger}
            //width={1000}
            >

                <Label>Kode BLUD</Label>
                <Input placeholder="Kode Blud" value={kode_blud} onChange={e => setKodeBlud(e.target.value)} />

            </Modal>

            {/* Modal Print SPPD */}

            <Modal
                title="Print SPPD"
                centered
                visible={modalPrintSppd}
                //onOk={createorupdate}
                onCancel={modalTriggerPrintSppd}
                footer={null}
            //width={1000}
            >
                <ComponentToPrint
                    key={id}
                    ref={componentRef}
                    dataToPrint={id}
                />
                <ReactToPrint
                    trigger={() => <Button block type="primary" icon={<PrinterOutlined />}>Print</Button>}
                    content={() => componentRef.current}
                />

            </Modal>

            <Modal
                title="Print Kwitansi"
                centered
                visible={modalPrintKwitansi}
                //onOk={createorupdate}
                onCancel={modalTriggerPrintKwitansi}
                footer={null}
                width={1000}
            >
                <ComponentToPrintKwitansi
                    key={id}
                    ref={componentRef}
                    dataToPrint={id}
                />
                <ReactToPrint
                    trigger={() => <Button block type="primary" icon={<PrinterOutlined />}>Print</Button>}
                    content={() => componentRef.current}
                />

            </Modal>

            {/* Modal Pengikut */}

            <Modal
                title="Input Pagu"
                centered
                visible={modalPagu}
                //onOk={() => createPengikut(id)}
                onCancel={modalTriggerPagu}
                width={1000}
                footer={null}
            >

                <Row style={{ width: '100%', marginBottom: 20, backgroundColor: '#0984e3' }} >
                    <Col xs={24} sm={24} md={6} lg={12} xl={12} style={{ padding: 10 }}>
                        <Label style={{ color: 'white' }}>Tahun Anggaran</Label>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            style={{ width: '100%', borderWidth: 0 }}
                            onChange={onChangeTahunAnggaran}
                        >
                            <Option value="">Tahun Anggaran</Option>
                            {listTahunAnggaran.map((data, index) =>
                                <Option value={data.nama_attr}>{data.nama_attr}</Option>
                            )}
                        </Select>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={12} xl={12} style={{ padding: 10 }}>
                        <Label style={{ color: 'white' }}>Besaran Pagu</Label>
                        <InputNumber

                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            style={{ width: '100%' }}
                            onChange={value => setPagu(value)}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: 10 }}>
                        <Button block type="primary" onClick={createPagu}> Simpan</Button>
                    </Col>
                </Row>


                <Table columns={columnsPagu} dataSource={listPagu} />
            </Modal>

        </Content>
    )
}

export default Sppd;



