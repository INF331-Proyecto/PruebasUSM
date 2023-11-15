import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthContext } from '@/components/SessionContext';
import Carrito from './Carrito';

export default function Navbar() {
	const { setAuthenticated } = useContext(AuthContext);
	const router = useRouter();
	const handleCerrarSesion = () => {
		setAuthenticated(false);
		router.push('/');
	};
	const [loggedIn, setLoggedIn] = useState(false);

	const isLoggedIn = () => {
        if (localStorage.getItem('email') != null) {
            return true;
        }
        return false;
    };

	const handleLogout = () => {
        localStorage.removeItem('email');
        setLoggedIn(false);
    };
      
    const checkLoginStatus = () => {
        setLoggedIn(isLoggedIn());
    };
      
    useEffect(() => {
        checkLoginStatus();
    }, []);

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<Link className='navbar-brand' href='/Homes'>
					Fashion Shop
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#Navbar'
					aria-expanded='false'	
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<form className='collapse navbar-collapse me-auto' id='Navbar'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
					<li className='nav-item'>
						<Link className='nav-link' href='/Inventario'>
							Inventario
						</Link>
					</li>
					</ul>
					<ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
					<Carrito/>
						<li className='nav-item'>
							{!loggedIn ? (
								<Link className='nav-link' href='/Login'>
									Crear Cuenta / Login
								</Link>
							) : (
								<div>
									{localStorage.getItem('email')}
								
								<Link className='nav-link' href='/Homes' onClick={handleLogout}>
									Cerrar Sesion
								</Link>
								</div>
							)}							
						</li>
					</ul>
				</form>
			</div>
		</nav>
	);
}
