import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Master from './Master';
import Dashboard from './component/Dashboard';
import Koderekening from './component/Koderekening';
import Addpegawai from './component/Addpegawai';
import Instansi from './component/Instansi';
import Login from './component/auth/Login';
import LoginBlud from './component/auth/Loginblud';
import Blud from './component/Blud'
import Program from './component/Program'

import Updatepegawai from './component/Updatepegawai';
import Masterblud from './component/Masterblud';
import Attr from './component/Attr';
import Rincian from './component/Rincian';
import Surattugas from './component/Surattugas';
import Administrator from './component/Administrator';
import Pegawai from './component/Pegawai';
import Pagu from './component/Pagu';
import Referensi from './component/Referensi';

function Routemain(){
    return(
        <Router history={browserHistory} >
            <Route path={`${process.env.PUBLIC_URL}/`} component={Login} />
            <Route component={Master}>
                <Route path={`${process.env.PUBLIC_URL}/dashboard`} component={Dashboard} />
                <Route path={`${process.env.PUBLIC_URL}/koderekening`} component={Koderekening} />
                <Route path={`${process.env.PUBLIC_URL}/addpegawai`} component={Addpegawai} />
                <Route path={`${process.env.PUBLIC_URL}/masterblud`} component={Masterblud} />
                <Route path={`${process.env.PUBLIC_URL}/attr`} component={Attr} />
                <Route path={`${process.env.PUBLIC_URL}/administrator`} component={Administrator} />
                <Route path={`${process.env.PUBLIC_URL}/surattugas`} component={Surattugas} />
                <Route path={`${process.env.PUBLIC_URL}/rincian`} component={Rincian} />
                <Route path={`${process.env.PUBLIC_URL}/blud`} component={Blud} />
                <Route path={`${process.env.PUBLIC_URL}/program`} component={Program} />
                <Route path={`${process.env.PUBLIC_URL}/pegawai`} component={Pegawai} />
                <Route path={`${process.env.PUBLIC_URL}/pagu`} component={Pagu} />
                <Route path={`${process.env.PUBLIC_URL}/referensi`} component={Referensi} />
            </Route>
        </Router>
    );
}

export default Routemain