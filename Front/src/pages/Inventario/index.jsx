import { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import Layout from "@/components/Layout";
import InventarioTable from "./InventarioTable";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export default function Inventario() {
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productoGuardados, setProductoGuardados] = useState([]);
  const [value, setValue] = useState([30, 60]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleSaveChanges = async () => {
    console.log(selectedProduct);
    const formDataToSend = new FormData();
    formDataToSend.append("name", selectedProduct.name);
    formDataToSend.append("price", selectedProduct.price);
    formDataToSend.append("image", selectedProduct.image);
    formDataToSend.append("description", selectedProduct.description);
    formDataToSend.append("amount", selectedProduct.amount);

    try {
      const response = await fetch("http://20.231.216.22/products", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("Product created:", data);
      } else {
        console.error("Error creating product 2:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating product 1:", error);
    }
    handleClose();
  };

  return (
    <Layout>
      <Row>
        <Col xs={12} md={2}>
          <div>
            <h2>Filtros</h2>
            <div className="title">Precio</div>
            <RangeSlider value={value} onInput={setValue} />

            <div class="container"></div>
          </div>
          <Button variant="primary">Filtrar</Button>
        </Col>
        <Col xs={12} md={10}>
          <InventarioTable />
        </Col>
      </Row>
      <Button onClick={handleShow}>Añadir Producto</Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label for="name">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Introducir Nombre..."
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="price">Precio</label>
              <input
                type="text"
                className="form-control"
                id="price"
                placeholder="Introducir precio..."
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="description">Descripcion</label>
              <input
                type="text"
                className="form-control"
                id="descriptiob"
                placeholder="Introducir descripcion..."
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label for="amount">Cantidad</label>
              <input
                type="text"
                className="form-control"
                id="amount"
                placeholder="Introducir numero..."
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Imagen</label>
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
    </Layout>
  );
}
