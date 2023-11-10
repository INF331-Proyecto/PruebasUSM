import {useState} from "react";
import style from './index.module.css';
import {Button} from 'react-bootstrap';

export default function Login ({onLogin, storedEmail, storedPass}) {
    console.log(storedEmail, storedPass);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginClick = (e) => {
        e.preventDefault();
        if (email === storedEmail && password === storedPass) {
            onLogin();
        } else {
            alert("Datos incorrectos");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form>
					<div className="form-group">
						<label for="email">Email</label>
						<input
							type="text"
							className="form-control"
							id="email"
							placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
                    <div className="form-group" style={{marginBottom: "1rem"}}>
						<label for="password">Contraseña</label>
						<input
							type="password"
							className="form-control"
							id="contraseña"
							placeholder="Contraseña"
                            onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
                    <Button variant="primary" onClick={handleLoginClick} >
					    Iniciar
				    </Button>
				</form>
        </div>
    );
};