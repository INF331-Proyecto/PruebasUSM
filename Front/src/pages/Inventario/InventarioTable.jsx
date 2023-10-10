import { Table, Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import styles from './index.module.css';

export default function PrestamosTablaAdmin({ }) {
	const [value, setValue] = useState([30, 60]);
	const [productos, setProductos] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState({
	});

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

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setSelectedProduct((prevProduct) => ({
			...prevProduct,
			image: file,
		}));
	};
	  
	const handleSaveChanges = async() => {
		const updatedProductos = productos.map((producto) =>
		  producto._id === selectedProduct._id ? selectedProduct : producto
		);
		setProductos(updatedProductos);
		setSelectedProduct(null);
		console.log(selectedProduct);
		const formDataToSend = new FormData();
		formDataToSend.append('name', selectedProduct.name);
		formDataToSend.append('price', selectedProduct.price);
		formDataToSend.append('image', selectedProduct.image);
		formDataToSend.append('description', selectedProduct.description);
		formDataToSend.append('amount', selectedProduct.amount);

		try {
		const response = await fetch('http://localhost:5000/products', {
			method: 'PATCH',
			body: formDataToSend,
		});

		if (response.status === 200) {
			const data = await response.json();
			// Handle success, maybe fetch products again to update the list
			console.log('Product edited:', data);
		} else {
			// Handle error, show an error message to the user
			console.error('Error editing product 2:', response.statusText);
		}
		} catch (error) {
		console.error('Error editing product 1:', error);
		}
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
						<tr key={producto._id}>
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
							value={selectedProduct ? selectedProduct.name : ''}
							onChange={(e) => handleInputChange('nombre', e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label for="price">Precio</label>
						<input
						type="text"
						className="form-control"
						id="price"
						placeholder="Introduzca precio"
						value={selectedProduct ? selectedProduct.price : ''}
						onChange={(e) => handleInputChange('price', e.target.value)}
						/>

					</div>
					<div className="form-group">
						<label for="description">Descripcion</label>
						<input
						type="text"
						className="form-control"
						id="description"
						placeholder="description"
						value={selectedProduct ? selectedProduct.description : ''}
						onChange={(e) => handleInputChange('description', e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label for="cantidad">Cantidad</label>
						<input
						type="text"
						className="form-control"
						id="amount"
						placeholder="Añada cantidad"
						value={selectedProduct ? selectedProduct.amount : ''}
						onChange={(e) => handleInputChange('amount', e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label for="imagen">Imagen</label>
						<input
							type="file"
							accept="image/*"
							className="form-control"
							id="image"
							onChange={handleImageChange}
							required
						/>
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
