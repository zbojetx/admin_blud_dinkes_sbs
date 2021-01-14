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

    const [kode_akun, setKodeAkun] = useState('')
    const [deskripsi_akun, setDeskripsiAkun] = useState('')
    const [kode_kelompok, setKodeKelompok] = useState('')
    const [deskripsi_kelompok, setDeskripsiKelompok] = useState('')
    const [kode_jenis, setKodeJenis] = useState('')
    const [deskripsi_jenis, setDeskripsiJenis] = useState('')
    const [kode_objek, setKodeObjek] = useState('')
    const [deskripsi_objek, setDeskripsiObjek] = useState('')
    const [kode_rincian_objek, setKodeRincianObjek] = useState('')
    const [deskripsi_rincian_objek, setDeskripsiRincianObjek] = useState('')
    const [deskripsi_final, setDeskripsiFinal] = useState('')

    const [listReferensi, setListReferensi] = useState([])
    const [listAkun, setListAkun] = useState([])
    const [listKelompok, setListKelompok] = useState([])
    const [listJenis, setListJenis] = useState([])
    const [listObjek, setListObjek] = useState([])
    const [listRincianObjek, setListRincianObjek] = useState([])

    const [listKodeRekening, setListKodeRekening] = useState([])


    useEffect(() => {
        getkoderekening()
        rekAkun()
        rekKelompok()
        rekJenis()
        rekObjek()
        rekRincianObjek()
    }, []);



    const modalTrigger = () => {
        setModal(!modal)
    }

    const rekAkun = async () => {
        const url = 'getkodebyjenis'
        const jenis = 'akun'
        const data = []
        let akun = await getbyid(jenis, url)
        setListAkun(akun)
    }
    const rekKelompok = async () => {
        const url = 'getkodebyjenis'
        const jenis = 'kelompok'
        const data = []
        let akun = await getbyid(jenis, url)
        setListKelompok(akun)
    }

    const rekJenis = async () => {
        const url = 'getkodebyjenis'
        const jenis = 'jenis'
        const data = []
        let akun = await getbyid(jenis, url)
        setListJenis(akun)
    }

    const rekObjek = async () => {
        const url = 'getkodebyjenis'
        const jenis = 'objek'
        const data = []
        let akun = await getbyid(jenis, url)
        setListObjek(akun)
    }

    const rekRincianObjek = async () => {
        const url = 'getkodebyjenis'
        const jenis = 'rincianobjek'
        const data = []
        let akun = await getbyid(jenis, url)
        setListRincianObjek(akun)
    }

    const getkoderekening = async () => {
        const data = []
        const url = 'getkoderekening'
        let kd = await getall(url)
        let data_length = kd.length
        console.log("KODE REKENING")
        console.log(kd)
        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: kd[i].id,
                kode_akun: kd[i].kode_akun,
                kode_kelompok: kd[i].kode_kelompok,
                kode_jenis: kd[i].kode_jenis,
                kode_objek: kd[i].kode_objek,
                kode_rincian_objek: kd[i].kode_rincian_objek,
                deskripsi_akun: kd[i].deskripsi_akun,
                deskripsi_kelompok: kd[i].deskripsi_kelompok,
                deskripsi_jenis: kd[i].deskripsi_jenis,
                deskripsi_objek: kd[i].deskripsi_objek,
                deskripsi_rincian_objek: kd[i].deskripsi_rincian_objek,
                deskripsi_final: kd[i].deskripsi_final
            })
        }
        setListKodeRekening(data)
    }

    const removekoderekening = async (idx) => {
        const url = 'deletekoderekening'
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
            getkoderekening()
        }
    }

    const create = async () => {
        let idkoderek = `${kode_akun}${kode_kelompok}${kode_jenis}${kode_objek}${kode_rincian_objek}`
        let datas = {
            id_kode_rekening: idkoderek,
            kode_akun,
            deskripsi_akun,
            kode_kelompok,
            deskripsi_kelompok,
            kode_jenis,
            deskripsi_jenis,
            kode_objek,
            deskripsi_objek,
            kode_rincian_objek,
            deskripsi_rincian_objek,
            deskripsi_final
        }
        const apiurl = 'createkoderekening';
        console.log(apiurl)
        let createkoderekening = await createupdate(datas, apiurl)
        if (createkoderekening === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getkoderekening()
            modalTrigger()
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
            render: (text, record) => {
                return(
                <span><b>{record.kode_akun}{record.kode_kelompok}{record.kode_jenis}{record.kode_objek}{record.kode_rincian_objek}</b></span>
                )
            }
        },
        {
            title: 'Deskripsi',
            key: 'deskripsi_rincian_objek',
            render: (text, record) => {
                return(
                    <>
                        <span>{record.deskripsi_final}</span> <br/>
                    </>
                )
            }
        },
        {
            title: 'Deskripsi Detail',
            key: 'deskripsi_rincian_objek',
            render: (text, record) => {
                return(
                    <>
                        <span>{record.kode_akun} - {record.deskripsi_akun}</span> <br/>
                        <span>{record.kode_kelompok} - {record.deskripsi_kelompok}</span> <br/>
                        <span>{record.kode_jenis} - {record.deskripsi_jenis}</span> <br/>
                        <span>{record.kode_objek} - {record.deskripsi_objek}</span> <br/>
                        <span>{record.kode_rincian_objek} - {record.deskripsi_rincian_objek}</span> <br/>
                    </>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    {/* <Button key="edit" onClick={() => getkoderekeningbyid(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<InfoCircleOutlined />} >Edit</Button> */}
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => removekoderekening(record.id)}
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

    const onChangeAkun = value => {
        const akunsplit = value.split('|')
        setKodeAkun(akunsplit[0])
        setDeskripsiAkun(akunsplit[1])
        setDeskripsiFinal(akunsplit[1])
    }

    const onChangeKelompok = value => {
        const kelompoksplit = value.split('|')
        setKodeKelompok(kelompoksplit[0])
        setDeskripsiKelompok(kelompoksplit[1])
        setDeskripsiFinal(kelompoksplit[1])
    }

    const onChangeJenis = value => {
        const jenissplit = value.split('|')
        setKodeJenis(jenissplit[0])
        setDeskripsiJenis(jenissplit[1])
        setDeskripsiFinal(jenissplit[1])
    }

    const onChangeObjek = value => {
        const objeksplit = value.split('|')
        setKodeObjek(objeksplit[0])
        setDeskripsiObjek(objeksplit[1])
        setDeskripsiFinal(objeksplit[1])
    }

    const onChangeRincianObjek = value => {
        const rincaianobjeksplit = value.split('|')
        setKodeRincianObjek(rincaianobjeksplit[0])
        setDeskripsiRincianObjek(rincaianobjeksplit[1])
        setDeskripsiFinal(rincaianobjeksplit[1])
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
                title="Kode Rekening"
                extra={<Button type="dashed" onClick={createnew}>Buat Kode Rekening</Button>}
                style={{ width: '100%', marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            >
            </Card>
            <Table columns={columns} dataSource={listKodeRekening} />

            <Modal
                title="Buat Kode Rekening"
                centered
                visible={modal}
                onOk={createorupdate}
                onCancel={modalTrigger}
                width={1000}
            >
                <InputBoxAbove >
                    <Label>Kode Akun</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Pilih Kode Akun"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeAkun}
                    // value={kode_akun}
                    >
                        {listAkun.map((data, index) =>
                            <Option value={`${data.kode}|${data.deskripsi}`}>{data.kode} - {data.deskripsi}</Option>
                        )}

                    </Select>
                </InputBoxAbove>
                <InputBoxCenter>
                    <Label>Kode Kelompok</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Pilih Kode Kelompok"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeKelompok}
                    // value={jenis}
                    >
                        {listKelompok.map((data, index) =>
                            <Option value={`${data.kode}|${data.deskripsi}`}>{data.kode} - {data.deskripsi}</Option>
                        )}
                    </Select>
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Kode Jenis</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Pilih Kode Jenis"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeJenis}
                    // value={jenis}
                    >
                        {listJenis.map((data, index) =>
                            <Option value={`${data.kode}|${data.deskripsi}`}>{data.kode} - {data.deskripsi}</Option>
                        )}
                    </Select>
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Kode Objek</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Pilih Kode Objek"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeObjek}
                    // value={jenis}
                    >
                        {listObjek.map((data, index) =>
                            <Option value={`${data.kode}|${data.deskripsi}`}>{data.kode} - {data.deskripsi}</Option>
                        )}
                    </Select>
                </InputBoxCenter>
                <InputBoxBottom>
                    <Label>Kode Rincian Objek</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Pilih Kode Rincian Objek"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeRincianObjek}
                    // value={jenis}
                    >
                        {listRincianObjek.map((data, index) =>
                            <Option value={`${data.kode}|${data.deskripsi}`}>{data.kode} - {data.deskripsi}</Option>
                        )}
                    </Select>
                </InputBoxBottom>
            </Modal>
        </Content>
    )
}

export default Referensi;







