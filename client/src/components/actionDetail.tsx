import { useState, useEffect, useRef } from 'react';
import useAuth from '../hooks/useAuth';
import { useHistory, useLocation } from 'react-router-dom';

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import useActionsDetails from '../hooks/useActionsDetails';
import Spinner from './Spinner';
import { userAction } from '../interfaces/userInterface';

interface T extends userAction {
}

const ActionDetail = () => {

    const { state } = useLocation<T>()
    const { user, isLogged } = useAuth();
    const history = useHistory();
    const [optionSelected, setOptionSelected] = useState(0)
    const [intervalo, setIntervalo] = useState(1)
    const actionSelected = useRef<T>(state).current
    const { values, error, setDesde, setHasta, changeOptions, chartOptions, loadValues, isLoading } = useActionsDetails(optionSelected, intervalo, actionSelected )

    useEffect(() => {
        if(isLogged === false)
            history.push('/')

    }, [isLogged, history])

    useEffect(() => {
        changeOptions()
    }, [values, changeOptions])

    const changeinterval = (val: string) => {
        setIntervalo(+val)
    }

    return (
        <div className='container'>
            <div className='header'>
                <p>{actionSelected.symbol} - {actionSelected.name} - {actionSelected.currency}</p>
                <p>Usuario: {user?.login}</p>
            </div>
            <div>
                <input type="radio" name="graficar" onChange={()=> setOptionSelected(0)} id="graficar" checked={optionSelected === 0? true : false} />
                &nbsp;&nbsp;Tiempo Real
                <br></br><br></br>
                <input type="radio" name="graficar" onChange={()=> setOptionSelected(1)} id="graficar" checked={optionSelected === 1? true : false} />
                &nbsp;&nbsp;Histórico

                &nbsp;&nbsp;
                Desde <input type='date' onChange={(e)=>setDesde(e.target.value)} placeholder='Desde' />
                &nbsp;&nbsp;&nbsp;&nbsp;
                Hasta <input type='date' onChange={(e)=>setHasta(e.target.value)} placeholder='Hasta' />

                {error && <p style={{marginTop: 20}} className='text-danger'>{error}</p>}

            </div>
            <div style={{marginTop: 50, display:'flex', width:500, justifyContent: 'flex-start'}}>
                &nbsp;&nbsp;Intervalo&nbsp;&nbsp;&nbsp;&nbsp;
                <select onChange={(e) => changeinterval(e.target.value)} name="intervalo" id="intervalo">
                    <option value="1">1 Minuto</option>
                    <option value="5">5 Minutos</option>
                    <option value="15">15 Minutos</option>
                </select>
            </div>
            <div id='grafico' style={{marginTop: 50, display:'flex', width:500, justifyContent: 'space-between'}}>
                <button onClick={() => history.goBack()} className='btn btn-warning btn-sm'>Volver</button>
                <button onClick={loadValues} className='btn btn-primary btn-sm'>Graficar</button>
            </div>
            <div style={{marginTop: 100, display:'flex', width:800, justifyContent: 'center', alignItems: 'center'}}>
                {
                    values.length ? isLoading? <Spinner/> : <div style={{width: '100%'}}><HighchartsReact highcharts={Highcharts} options={chartOptions} /></div> : ''
                }
            </div>
        </div>
    )
}

export default ActionDetail
