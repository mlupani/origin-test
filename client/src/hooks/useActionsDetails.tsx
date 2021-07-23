import { useState, useEffect, useCallback } from 'react';
import twelvedata, {apikey} from '../api/twelvedataAPI';
import { userAction } from '../interfaces/userInterface';

interface DataValues {
    date: string,
    value: string
}

const useActionsDetails = (optionSelected: number = 1, intervalo: number = 1, actionSelected: userAction) => {

    const [timeInterval, setTimeInterval] = useState<any>()
    const [error, setError] = useState('')
    const [values, setValues] = useState<DataValues[]>([])
    const [desde, setDesde] = useState('')
    const [hasta, setHasta] = useState('')
    const [chartOptions, setChartOptions] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        return () => {
            clearInterval(timeInterval)
        }
    }, [timeInterval])

    const graficar = async () => {
        const time = setInterval(() => loadValues(), intervalo * 60000)
        setTimeInterval(time)
        //clearInterval(time)
    }

    const loadValues = async () => {

        setIsLoading(true)

        clearInterval(timeInterval)
        setError('')
        let newValues = [];

        if(optionSelected === 0){
            try {
                console.log(`https://api.twelvedata.com/time_series?symbol=${actionSelected.symbol}&interval=${intervalo}min&apikey=${apikey}`);
                const res = await twelvedata.get(`https://api.twelvedata.com/time_series?symbol=${actionSelected.symbol}&interval=${intervalo}min&apikey=${apikey}`)
                newValues = res.data.values.map(({datetime,open}: any) => {
                    const d = new Date(datetime)
                    const date = d.getHours()+':'+(d.getMinutes()<10?'0':'') + d.getMinutes();
                    return {date, value: +open }
                })

                setValues(newValues.reverse().slice(newValues.length - 5,newValues.length))
                graficar()
            } catch (error) {
                console.log(`https://api.twelvedata.com/time_series?symbol=${actionSelected.symbol}&interval=${intervalo}min&apikey=${apikey}`);
                console.log(error);
            }
        }

        if(optionSelected === 1){

            if(desde.trim() === '' || hasta.trim() === '') {
                setError('Por favor seleccione una fecha de inicio y de fin')
                return false;
            }

            const date_desde = new Date(desde);
            const date_hasta = new Date(hasta);

            if(date_desde > date_hasta){
                setError('Por favor seleccione una fecha de inicio menor a la de fin')
                return false;
            }

            try {
                const res = await twelvedata.get(`https://api.twelvedata.com/time_series?symbol=${actionSelected.symbol}&interval=${intervalo}min&start_date=${desde}%2009:48:00&end_date=${hasta}%2019:48:00&apikey=${apikey}`)
                newValues = res.data.values.map(({datetime,open}: any) => {
                    const d = new Date(datetime)
                    const date = d.getHours()+':'+(d.getMinutes()<10?'0':'') + d.getMinutes();
                    return {date, value: +open }
                })
                setValues(newValues.reverse().slice(newValues.length - 5,newValues.length))
                graficar()
            } catch (error) {
                console.log(`https://api.twelvedata.com/time_series?symbol=${actionSelected.symbol}&interval=${intervalo}min&start_date=${desde}%2009:48:00&end_date=${hasta}%2019:48:00&apikey=${apikey}`);
                console.log(error);
            }
        }

        setIsLoading(false)

    }

    const changeOptions = useCallback(() => {
            setChartOptions({
                series: [
                    {
                        data: values.map(({value}: any) => value),
                        name:'Cotización',
                        enablePolling: true,
                        dataRefreshRate: intervalo
                    },
                ],
                title: {
                    text:actionSelected.symbol
                },
                xAxis: [{
                    tickintervalo: 1,
                    title: {
                        text: 'intervalo',
                    },
                    labels: {
                            enabled: true,
                            formatter: (val: any) => values[val.value].date
                        }
                }],
                yAxis: [{
                    title: {
                        text: 'Cotizacion'
                    }
                }],
            })
        },[intervalo, actionSelected.symbol, values])

    return {
        values,
        error,
        setDesde,
        setHasta,
        changeOptions,
        chartOptions,
        loadValues,
        isLoading
    }
}

export default useActionsDetails
