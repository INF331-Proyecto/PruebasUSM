import React from 'react';
import styles from './producto.module.css';
import { Button } from 'react-bootstrap';
import { useCart } from '@/context/context';

const Item = ({ item }) => {
  const { addToCart } = useCart();
  const base64String = btoa(String.fromCharCode(...new Uint8Array(item.image.data)));

  return (
    <div className={styles.item}>
      <img src={`data:image/png;base64,${base64String}`} alt={item.name} />
      <h3>{item.name}</h3>
      <p>${item.price}</p>
      <Button className='sell' variant="primary" onClick={() => addToCart(item)}>
        Añadir
      </Button>
    </div>
  );
};

export default Item;