import Trash from '../../assets/Trash.svg';
import './style.css';
import api from '../../services/api';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [users, setUsers] = useState([]); 
    const inputName = useRef();
    const inputAge = useRef();
    const inputEmail = useRef();

    async function getUsers() {
        try {
            const response = await api.get('/utilizadores');
            setUsers(response.data); 
            toast.success('Utilizadores carregados com sucesso!',{
                autoClose: 3000,
                position: 'top-right'
            });  
        } catch (error) {
            console.error('Erro ao buscar os utilizadores:', error);
            toast.error('Erro ao buscar os utilizadores!', {
                autoClose: 3000,
                position: 'top-right'
            });
        }
    }

    async function createUsers() {
        try {
            await api.post('/utilizadores', {
                name: inputName.current.value,
                age: inputAge.current.value,
                email: inputEmail.current.value
            });
            toast.success('Utilizador criado com sucesso!', {
                autoClose: 3000,
                position: 'top-right'
            });

            // Limpar os campos após o envio
            inputName.current.value = '';
            inputAge.current.value = '';
            inputEmail.current.value = '';

            getUsers();

        } catch (error) {
            console.error('Erro ao buscar os utilizadores:', error);
            toast.error('Erro ao buscar os utilizadores!', {
                autoClose: 3000,
                position: 'top-right'
            });
        }
    }

    async function deleteUsers(id) {
        try {
            await api.delete(`/utilizadores/${id}`); 
            toast.success('Utilizador removido com sucesso!', {
                autoClose: 3000,
                position: 'top-right'
            });  

            getUsers();
            
        } catch (error) {
            console.error('Erro ao remover o utilizador:', error);
            toast.error('Erro ao remover o utilizador!', {
                autoClose: 3000,
                position: 'top-right'
            });
        }
    }
    

    useEffect(() => {
        getUsers();
    }, []);  

    return (
        <div className="container">
            <form action="">
                <h1>Registo de Utilizadores</h1>
                <input name="nome" type="text" placeholder='Nome' ref={inputName} />
                <input name="idade" type="text" placeholder='Idade' ref={inputAge} />
                <input name="Email" type="email" placeholder='Email' ref={inputEmail} />
                <button type="button" onClick={createUsers}>Registar</button>
            </form>

            {/* Renderização dos utilizadores */}
            {users.map(user => (
                <div key={user.id} className='card'>
                    <div>
                        <p>Nome: <span>{user.name}</span> </p>
                        <p>Idade: <span>{user.age}</span> </p>
                        <p>Email: <span>{user.email}</span></p>
                    </div>
                    <button onClick={() => deleteUsers(user.id)}>
                        <img src={Trash} alt="Delete" style={{ width: '20px', height: '20px' }} />
                    </button>
                </div>
            ))}
            <ToastContainer />
        </div>
    );
}

export default Home;
