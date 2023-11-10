import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
  };

  return (
    <div>
      <h2>Registrar</h2>
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
            <Button variant="primary" onClick={handleSubmit} >
				Registrar
			</Button>
		</form>
    </div>
  );
};

export default Register;