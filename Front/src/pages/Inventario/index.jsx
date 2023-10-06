import { useState, useRef, useEffect } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import Layout from '@/components/Layout';
import InventarioTable from './InventarioTable';

export default function Inventario() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleInputChange = (field, value) => {
		setSelectedProduct((prevProduct) => ({
		  	...prevProduct,
		  	[field]: value,
		}));
	};

	const handleSaveChanges = () => {
		//Aqui supongo que irian las llamadas al backend
		handleClose();
	  };

	return (
		<Layout>
			<Row>
			<Col xs={12} md={2} >
				<div>
					<h2>Categorias</h2>
					<ul>
						<li>Materiales</li>
						<li>Herramientas</li>
						<li>Equipos</li>
					</ul>
				</div>
				<Button variant="primary">Filtrar</Button>
			</Col>
			<Col xs={12} md={10}>
			<InventarioTable/>
			</Col>
			</Row>
			<Button onClick={handleShow}>Añadir Producto</Button>
			<Modal 
		show={show} 
		onHide={handleClose}
		backdrop="static"
		keyboard={false}>

			<Modal.Header closeButton>
				<Modal.Title>Editar producto</Modal.Title>		
			</Modal.Header>
			<Modal.Body>
				<form>
					<div className="form-group">
						<label for="nombre">Nombre</label>
						<input
							type="text"
							className="form-control"
							id="nombre"
							placeholder="Nombre"
							onChange={(e) => handleInputChange('nombre', e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label for="tag">Tag</label>
						<input
						type="text"
						className="form-control"
						id="tag"
						placeholder="tag"
						onChange={(e) => handleInputChange('tag', e.target.value)}
						/>

					</div>
					<div className="form-group">
						<label for="descripcion">Descripcion</label>
						<input
						type="text"
						className="form-control"
						id="descripcion"
						placeholder="descripcion"
						onChange={(e) => handleInputChange('descripcion', e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label for="cantidad">Cantidad</label>
						<input
						type="text"
						className="form-control"
						id="cantidad"
						placeholder="cantidad"
						onChange={(e) => handleInputChange('cantidad', e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label for="imagen">Imagen</label>
						<input type="file" className="form-control-file" id="imagen" />
					</div>
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cerrar
				</Button>
				<Button variant="primary" onClick={handleSaveChanges}>
					Guardar cambios
				</Button>
			</Modal.Footer>
		</Modal>
		</Layout>
	);
}
