import Layout from "@/components/Layout";
import ItemGrid from "@/components/ItemGrid";
import styles from "./index.module.css";
import { Col, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export default function Homes() {
  const [ProductoGuardados, setProductoGuardados] = useState([]);
  const [value, setValue] = useState([30, 60]);

  /*
	useEffect(() => {
		const prices = ProductoGuardados.map(ProductoGuardados => parseFloat(ProductoGuardados.price));
		const minPrice = Math.min(...prices);
		const maxPrice = Math.max(...prices);
	
		setValue([minPrice, maxPrice]);
	  }, [ProductoGuardados]);*/

  useEffect(() => {
    fetch("http://20.231.216.22/products")
      .then((res) => res.json())
      .then((data) => setProductoGuardados(data));
  }, []);

  return (
    <Layout>
      <Row>
        <Col xs={12} md={2}>
          <div className={styles["sidebar-grid"]}>
            <h2>Filtros</h2>
            <div>Precio</div>
            <RangeSlider value={value} onInput={setValue} />
            <ul className={styles["sidebar-list"]}>
              <div class="container"></div>
            </ul>
          </div>
          <Button variant="primary">Filtrar</Button>
        </Col>
        <Col xs={12} md={10}>
          <div className={styles["content-grid"]}>
            <ItemGrid items={ProductoGuardados} />
          </div>
        </Col>
      </Row>
    </Layout>
  );
}
