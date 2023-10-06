import Layout from '@/components/Layout';
import ItemGrid from '@/components/ItemGrid';
import styles from './index.module.css';
import { Col, Row, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function Homes() {

	useEffect(() => {
		fetch('http://localhost:5000')
		.then((res)=> res.json())
		.then((data)=> setProductoGuardados(data));
	}, []);

	const [ProductoGuardados, setProductoGuardados] = useState([]);

	return (
		<Layout>
			<Row>
			<Col xs={12} md={2} >
				<div className={styles["sidebar-grid"]}>
					<h2>Categorias</h2>
					<ul clas className={styles["sidebar-list"]}>
						<li>Materiales</li>
						<li>Herramientas</li>
						<li>Equipos</li>
					</ul>
				</div>
				<Button variant="primary">Filtrar</Button>
			</Col>
			<Col xs={12} md={10}>
				<div className={styles["content-grid"]}>
					<ItemGrid items ={ProductoGuardados}/>
				</div>	
			</Col>
			</Row>
		</Layout>
	);
}