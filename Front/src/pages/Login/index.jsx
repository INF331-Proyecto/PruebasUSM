import {useState, useEffect} from "react";
import Login from "@/components/Login";
import Registrar from "@/components/Registrar";
import Link from 'next/link';
import {Button} from 'react-bootstrap';

export default function login () {
    const [registeredUser, setRegisteredUser] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = (email,password) => {
        console.log(email, password)
        console.log(localStorage.getItem("email"));
        setLoggedIn(true);
    };

    const isLoggedIn = () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('email');
            return !!token;
        }
        return false;
    };
      
    const checkLoginStatus = () => {
        setLoggedIn(isLoggedIn());
    };
      
    useEffect(() => {
        checkLoginStatus();
    }, []);
  
    const handleLogout = () => {
        localStorage.removeItem("email");
        setLoggedIn(false);
    };
  
    const handleRegister = (email, password) => {
        localStorage.setItem("email", email);
        setRegisteredUser([email, password]);
    };

    return (
        <div>
            <Link className='navbar-brand' href='/Homes'>
                <button type="submit" className="btn btn-primary" style={{ margin: "2rem" }}>
                    Volver
                </button>
            </Link>
                <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
                    {loggedIn ? (
                        <div>
                            <h2>A iniciado su sesion!</h2>
                            <Button variant="primary" onClick={handleLogout} >
            					Salir
            				</Button>
                        </div>
                    ) : (
                        <div>
                            <Login
                            onLogin={(email, password) => handleLogin(email, password)}
                            storedEmail={registeredUser[0]}
                            storedPass={registeredUser[1]}
                            />
                            <Registrar onRegister={handleRegister} />
                        </div>
                    )}
                </div>
        </div>
    );
};