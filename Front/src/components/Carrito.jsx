import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useCart} from '@/context/context';

const Carrito = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cartItems, total, totalItems } = useCart();
    const cartRef = useRef(null);
    const buttonRef = useRef(null);
  
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
            cartRef.current &&
            buttonRef.current &&
            !cartRef.current.contains(event.target) &&
            !buttonRef.current.contains(event.target)
            ) {
            setIsOpen(false);
            }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
  
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
  
    return (
        <div style={{ position: 'relative' }}>
            <Button ref={buttonRef} onClick={handleToggle}>
            Carrito ({totalItems})
            </Button>
    
            {isOpen && (
            <div style={cartStyles} ref={cartRef}>
                <h2>Carrito</h2>
                {cartItems.length !== 0 ? (
                    <div>
                        <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>{item.name} ${item.price} x {item.quanty}</li>
                        ))}
                        </ul>
                        <Button style={{marginTop:"2rem"}}>Comprar ${total}</Button>
                    </div>
                    ) : (
                    <p>Carrito Vacio</p>
                )}   
            </div>
            )}
        </div>
    );
};
  
const cartStyles = {
    position: 'absolute',
    paddingRight: '1rem',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '20px',
    background: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    width: 'auto',
    maxWidth: '25rem', 
    overflowY: 'auto', 
    whiteSpace: 'nowrap',
};

export default Carrito;

