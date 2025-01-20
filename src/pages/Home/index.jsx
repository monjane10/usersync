import Trash from '../../assets/Trash.svg'
import './style.css'


function Home() {
    const users = [{
        id: 1,
        name: 'João',
        age: 20,
        email: 'joao@gmail.com'

    }, {
        id: 2,
        name: 'Antonio',
        age: 25,
        email: 'antonio@gmail.com'

    }
    ]
    return (
        <div className="container">
            <form action="">
                <h1>Registo de Utilizadores</h1>
                <input name="nome" type="text" placeholder='Nome' />
                <input name="idade" type="text" placeholder='Idade' />
                <input name="Email" type="email" placeholder='Email'/>
                <button type="button">Registar</button>
            </form>

            {users.map(user => (
                <div key={user.id} className='card'>
                   <div>
                   <p>Nome: <span>{user.name}</span> </p>
                   <p>Idade: <span>{user.age}</span> </p>
                   <p>Email: <span>{user.email}</span></p>
               </div>
               <button>
                   <img src={Trash} alt="" style={{width: '20px', height: '20px'}} />
               </button>
           </div>

    ))
} 
 </div >
    );
}

export default Home;