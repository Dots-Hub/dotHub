import {useContext, useState} from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";


export default function LoginPage(){
   const [username,setUsername] = useState('');
   const [password,setPassword] = useState('');
   const [redirect,setRedirect] = useState(false);
   const [error, setError] = useState('');
   const {setUserInfo} = useContext(UserContext);
   async function login(ev){
       ev.preventDefault();
       setError('');

       if (!username || !password) {
        setError('Username and password are required');
        return;
    }


      const response = await fetch('http://localhost:4000/login',
       {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
       });

       if(response.ok)
       {
           response.json().then(userInfo =>{
            setUserInfo(userInfo);
            setRedirect(true);
           });
       }else
       {
        alert('wrong credentials');
       }
   }

   if(redirect)
   {
    return <Navigate to={'/'} />
   }
    return(
        <form className="login" onSubmit={login}>
            <h1>Login</h1>

            {error && (
               <div className="error" style={{ color: 'red', marginBottom: '10px' }}>
                   {error}
               </div>
           )}
            <input type="text" 
            placeholder="username" 
            value={username} 
            onChange={ev => setUsername(ev.target.value)}/>
            <input type="password" 
            placeholder="password" 
            value={password} 
            onChange={ev => setPassword(ev.target.value)}/>
            <button>Login</button>
        </form>
    )
}