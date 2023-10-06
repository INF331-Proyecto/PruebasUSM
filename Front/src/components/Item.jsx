import React from 'react';
import styles from './producto.module.css';
import { Button } from 'react-bootstrap';

const Item = ({ item }) => {
    return (
        <div className={styles.item}>
            <img src={item.imagen} alt={item.nombre} />
            <h3>{item.nombre}</h3>
            <p>${item.precio}</p>
            <Button className='sell' variant="primary">Añadir</Button>
        </div>
    )
}

export default Item;