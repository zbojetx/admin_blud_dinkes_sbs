import React from 'react'
import axios from 'axios'

//const endpoint = 'https://api-blud.dinartech.com'
const endpoint = 'http://localhost:6789'

const year = new Date().getFullYear()


// Reusable Function ======================================================

//POST
export async function createupdate(datas, URL) {
    let status = 0
    await axios
    .post(`${endpoint}/${URL}`,{
        datas
    })
    .then(res => {
        if (res.data.kode === 1){
            status = 1
        }else{
            status = 2
        }
    })
    return status;
}

//GET
export async function getbyid(id, URL){
    let datas = []
    console.log(id)
    await axios
    .get(`${endpoint}/${URL}/${id}`)
    .then(res => {
        datas = res.data.datas
    })
    console.log(datas)
    return datas
}

export async function getall(URL){
    let datas = []
    await axios
    .get(`${endpoint}/${URL}`)
    .then(res => {
        datas = res.data.datas
    })
    console.log(datas)
    return datas
}

export async function getallpost(datas, URL){
    let datasretrurn = []
    await axios
    .post(`${endpoint}/${URL}`,{
        datas
    })
    .then(res => {
        datasretrurn = res.data.datas
    })
    console.log(datas)
    return datasretrurn
}


//DELETE
export async function remove(id, URL){
    let status = 0;

    await axios
    .get(`${endpoint}/${URL}/${id}`)
    .then(res => {
        if (res.data.kode === 1){
            status = 1
        }else{
            status = 2
        }
    })
    return status;
}

// ==========================================================================

//Authentication =============================================================

export async function login(datas, url) {
    console.log("6789")
    let status = 0
    await axios
    .post(`${endpoint}/${url}`,{
        username : datas.username,
        password : datas.password
    })
    .then(res => {
        if (res.data.kode === 1){
            localStorage.setItem('isLogin', JSON.stringify(res.data))
            localStorage.setItem('tahun', year)
            status = 1
        }else{
            status = 2
        }
    })
    return status;
}

// administrators =================================================================

export async function getAdmin(){
    let datas = []
    await axios
    .get(`${endpoint}/getadmin`)
    .then(res => {
        datas = res.data.datas
    })
    return datas
}

export async function addAdmin(datas){
    let status = 0;
    console.log(datas.satuan)
    await axios
    .post(`${endpoint}/createadmin`,{
        nama: datas.nama,
        username : datas.username,
        email: datas.email,
        password: datas.password
    })
    .then(res => {
        if (res.data.status === 1){
            status = 1
        }else{
            status = 2
        }
    })
    return status;
}

export async function delAdmin(id){
    let status = 0;

    await axios
    .get(`${endpoint}/deleteadmin/${id}`)
    .then(res => {
        if (res.data.status === 1){
            status = 1
        }else{
            status = 2
        }
    })
    return status;
}

//=================================================================================




