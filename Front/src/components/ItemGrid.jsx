import React from "react";
import Item from "./Item";
import styles from"./producto.module.css";

const ItemGrid = ({ items }) => {
    return (
        <div className={styles["f-container"]}>
            {items.map((item) => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    )
}

export default ItemGrid;