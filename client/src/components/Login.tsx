import { FormEvent, useEffect, useState } from 'react';
import useForm from '../hooks/useForm';
import { useHistory } from 'react-router-dom'
import '../styles/Login.css';
import users from '../api/users';

const Login = () => {

    const history = useHistory();
    const [error, setError] = useState<string>('');
    const { user, pass, onChange } = useForm({
        user: '',
        pass: '',
    }, setError);

    const login = async (e: FormEvent) => {

        e.preventDefault();

        const { data } = await users.post('/login', { user, pass})

        let md5 = require("md5"); 

        //CHEQUEAR CON LA BASE DE DATOS
        if(user === data.login && md5(pass) === data.password){
            history.push(`/misAcciones`);
            setError('')
        }
        else{
            setError('Usuario o clave invalida');
        }
    }

    const logout = async () => {
        users.get('/logout').then((result) => {}).catch((err) => {console.log(err);});
    }

    
    useEffect(() => {
        logout();
    }, [])

    return (
        <div className="container form-login">
            <form>
                <div className="form-group">
                    <label htmlFor="usuario">Usuario</label>
                    <input type="text" className="form-control" autoComplete='off' onChange={(e) => onChange(e.target.value, 'user')} value={user} id="usuario" aria-describedby="emailHelp" placeholder="Ingresar nombre de usuario
                    " />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Clave</label>
                    <input type="password" className="form-control" autoComplete='off' onChange={(e) => onChange(e.target.value, 'pass')} value={pass} id="password" placeholder="Clave" />
                </div>
                {
                    error && <div className='error'>{error}</div>
                }
                <div style={{width: '300px'}} className='login'>
                    <br></br>
                    <button onClick={login} className="btn btn-primary">Ingresar</button>
                </div>
            </form>
        </div>
    )
}

export default Login;
