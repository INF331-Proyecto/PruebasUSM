import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Producto2 from "../img/2.jpeg";
import styles from "./producto.module.css";

export default function Producto() {

    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
        console.log(event.target.value);
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col sm={8}>
                        <h1 className={styles["nombre-producto"]}>Camisa de hombre</h1>
                        <h2 className={styles["precio-producto"]}>$ 15.000</h2>
                        <p className={styles["descripcion-producto"]}>Camisa de hombre con cuello y botones</p>
                        <p className={styles["descripcion-producto"]}>Color: Azul</p>

                    </Col>
                    <Col sm={4}>
                        <img src={Producto2} alt="Producto" className={styles["img-producto"]} />
                    </Col>
                    <Col sm={6}>
        <div className="size-selector">
            <label
            className={`square-button ${
                selectedSize === 'S'
                ? styles['square-button-checked']
                : styles['square-button']
            }`}
            htmlFor='S'
            >
            <input
				type='radio'
				id='S'
				name='tallaBoton'
				value='S'
				checked={selectedSize === 'S'}
				onChange={handleSizeChange}
			/>
			<span>S</span>
		    </label>
            <label
            className={`square-button ${
                selectedSize === 'M'
                ? styles['square-button-checked']
                : styles['square-button']
            }`}
            htmlFor='M'
            >
            <input
				type='radio'
				id='M'
				name='tallaBoton'
				value='M'
				checked={selectedSize === 'M'}
				onChange={handleSizeChange}
			/>
			<span>M</span>
		    </label>
            <label
            className={`square-button ${
                selectedSize === 'L'
                ? styles['square-button-checked']
                : styles['square-button']
            }`}
            htmlFor='L'
            >
            <input
				type='radio'
				id='L'
				name='tallaBoton'
				value='L'
				checked={selectedSize === 'L'}
				onChange={handleSizeChange}
			/>
			<span>L</span>
		    </label>
            <label
            className={`square-button ${
                selectedSize === 'XL'
                ? styles['square-button-checked']
                : styles['square-button']
            }`}
            htmlFor='XL'
            >
            <input
				type='radio'
				id='XL'
				name='tallaBoton'
				value='XL'
				checked={selectedSize === 'XL'}
				onChange={handleSizeChange}
			/>
			<span>XL</span>
		    </label>
        </div>
        </Col>
        </Row>
        <Row>
            <Col sm={8}>
                <button className={styles["square-button"]}>Agregar al carrito</button>
            </Col>
        </Row>
        </Container>
    </div>
  );
}
