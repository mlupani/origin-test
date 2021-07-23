//HOOK HECHO EN TYPESCRIPT QUE RECIBE UN OBJECTO CON KEY VALOR DE UN FORM Y DEVUELVE EL ESTADO SETEANDO LAS KEYS QUE SE LE PASEN POR PARAMETRO
import { useState } from 'react';

const useForm = <T extends Object>(initialState: T, setError: any) => {

    const [state, setState] = useState(initialState)

    const onChange = (value: string, field: keyof T) => {

        setError('')
        setState({
            ...state,
            [field]: value
        })
    }

    return {
        ...state,
        onChange
    }
}

export default useForm
