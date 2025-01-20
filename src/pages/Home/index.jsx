/**
 * Author: Lourenço Monjane
 */
import Trash from '../../assets/Trash.svg';
import './style.css';
import api from '../../services/api';
import { useEffect, useState } from 'react';

function Home() {
    const [users, setUsers] = useState([]); 

    async function getUsers() {
        try {
            const response = await api.get('/utilizadores');
            setUsers(response.data);  
        } catch (error) {
            console.error('Erro ao buscar os utilizadores:', error);
        }
    }

   
    useEffect(() => {
        getUsers();
    }, []);  
    return (
        <div className="container">
            <form action="">
                <h1>Registo de Utilizadores</h1>
                <input name="nome" type="text" placeholder='Nome' />
                <input name="idade" type="text" placeholder='Idade' />
                <input name="Email" type="email" placeholder='Email'/>
                <button type="button">Registar</button>
            </form>

            {/* Renderização dos utilizadores */}
            {users.map(user => (
                <div key={user.id} className='card'>
                    <div>
                        <p>Nome: <span>{user.name}</span> </p>
                        <p>Idade: <span>{user.age}</span> </p>
                        <p>Email: <span>{user.email}</span></p>
                    </div>
                    <button>
                        <img src={Trash} alt="Delete" style={{ width: '20px', height: '20px' }} />
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Home;
