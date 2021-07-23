import { useState, useEffect } from 'react';
import useDebauncedValue from '../hooks/useDebauncedValue';
import '../styles/MisAcciones.css'
import useGetActions from '../hooks/useGetActions';
import { Actions } from '../interfaces/twelvedataAPI';
import Spinner from './Spinner';
import users from '../api/users';
import useAuth from '../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
import { userAction } from '../interfaces/userInterface';

const MisAcciones = () => {

    const [search, setSearch] = useState('');
    const { user, isLogged } = useAuth();
    const debauncedValue = useDebauncedValue(search);
    const { actions, isLoading, actionsUser, loadActionsUser } = useGetActions(user?.id!);
    const [filteredValues, setFilteredValues] = useState<Actions[]>([]);
    const [searching, setSearching] = useState(false)
    const [selectedAction, setSelectedAction] = useState<Actions>()
    const history = useHistory();

    useEffect(() => {
        if(isLogged === false)
            history.push('/')
    }, [isLogged, history])

    useEffect(() => {
        if( debauncedValue){
            const newValues = actions.filter(act => act.name.toLowerCase().includes(debauncedValue.toLowerCase()))
            setFilteredValues(newValues)
            setSearching(false)
        } else{
            setFilteredValues([])
        }
    }, [debauncedValue, actions])

    useEffect(() => {
        if(search && search !== selectedAction?.name){
            setSearching(true)
            ///setSelectedAction({} as Actions)
        }
    }, [search, selectedAction])

    const selectAction = (action: Actions) => {
        setSearch('');
        setSelectedAction(action);
    }

    const deleteFilteredValues = () => {
        setTimeout(() => {
            setFilteredValues([])
        }, 400);
    }

    const saveAction = () => {

        const { symbol, name, currency } = selectedAction!;

        users.post('/saveAction', {
            user: user?.id,
            symbol,
            name,
            currency,
        }).then((result) => {
            setSearch('');
            setSelectedAction({} as Actions);
            loadActionsUser(user?.id);
        }).catch((err) => {
            console.log(err);
        });
    }

    const deleteAction = (action: userAction) => {
        const { id } = action
        users.delete(`/delete/${id}`).then(result => {
            loadActionsUser(user?.id);
        }).catch(err => {
            console.log(err);
        });
    }

    if(isLogged)
    return (
        <div className='container'>
            <div className='header'>
                <p>Mis acciones</p>
                <p>Usuario: {user?.login}</p>
            </div>
            <div className='content'>
                <div className='containerAutocomplete'>
                    <p style={{marginBottom: 0}} >Simbolo</p>
                    <div className='contentList'>
                        <input type='text' placeholder='Buscar..' onBlur={deleteFilteredValues} disabled={isLoading ? true : false} value={search ? search : selectedAction?.name?selectedAction.name : ''} onChange={(e: React.ChangeEvent<{ value: string }>) => setSearch(e.target.value)} className='form-control' />
                        {
                            filteredValues?.length ?
                                <ul style={{position:'absolute', marginTop: '38px', width: '300px'}} className='list-group'>
                                    {
                                        filteredValues.map((act, index) => <li onClick={(e) => selectAction(act)} key={act.name + act.symbol + index} style={{cursor:'pointer'}} className='list-group-item'>{act.name}</li>)
                                    }
                                </ul> : ''
                        }
                    </div>
                </div>
                {
                    searching && <Spinner/>
                }
                <button onClick={selectedAction ? saveAction : null!} className='btn btn-primary btn-sm simbolo'>Agregar Simbolo</button>
            </div>
            {
                actionsUser.length ?
                <div className='table-actions'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Simbolo</th>
                                <th>Nombre</th>
                                <th>Moneda</th>
                                <th></th>
                            </tr>
                        </thead>
                        {
                            actionsUser.length ?
                                <tbody>
                                    {
                                        actionsUser.map(act => <tr key={user?.id+act.name} ><td>
                                            <Link to={{pathname: "/actionDetail",state: {...act}}}>{act.symbol}</Link></td><td>{act.name}</td><td>{act.currency}</td><td><button className='btn btn-danger btn-sm' onClick={e => deleteAction(act)} >Eliminar</button></td></tr>)
                                    }
                                </tbody> : ''
                        }
                    </table>
                </div> : ''
            }
        </div>

    )
    else{
        return <div></div>
    }
}

export default MisAcciones
