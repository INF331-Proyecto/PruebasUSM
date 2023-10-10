import { Table, Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import styles from './index.module.css';

export default function PrestamosTablaAdmin({ }) {

	const [productos, setProductos] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState({});

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);	
	const handleShow = () => setShow(true);

	useEffect(() => {
		fetch('http://localhost:5000/products')
		.then((res)=> res.json())
		.then((data)=> setProductos(data));
	}, []);

	const handleEdit = (producto) => {
		setSelectedProduct(producto);
		handleShow();
	};

	const handleInputChange = (field, value) => {
		setSelectedProduct((prevProduct) => ({
		  	...prevProduct,
		  	[field]: value,
		}));
	};
	  
	const handleSaveChanges = () => {
		const updatedProductos = productos.map((producto) =>
		  producto.id === selectedProduct.id ? selectedProduct : producto
		);
		setProductos(updatedProductos);
		setSelectedProduct(null);
		handleClose();
	  };


	return (
		<div>
		<Table hover responsive className={`mt-3 mx-auto ${styles['inventario-table']}`}>
			<thead>
				<tr className={styles['table-head']}>
					<th className='text-center'>ID</th>
					<th>Nombre</th>
					<th>Descripcion</th>
					<th className='text-center'>Precio</th>
					<th className='text-center'>Cantidad</th>
					<th> </th>
				</tr>
			</thead>
			<tbody>
				{productos &&
					productos.map((producto) => (
						<tr key={producto.id}>
						<td className='align-middle text-center'>{producto.id}</td>
						<td className='align-middle'>{producto.name}</td>
						<td>{producto.description}</td>
						<td className='align-middle text-center'>{producto.price}</td>
						<td className='align-middle text-center'>{producto.amount}</td>
						<td>
							<Button onClick={() => handleEdit(producto)}>Editar</Button>
						</td>
						</tr>
					))}
			</tbody>
		</Table>
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
							value={selectedProduct ? selectedProduct.nombre : ''}
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
						value={selectedProduct ? selectedProduct.tag : ''}
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
						value={selectedProduct ? selectedProduct.descripcion : ''}
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
						value={selectedProduct ? selectedProduct.cantidad : ''}
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
		</div>
	);
}
