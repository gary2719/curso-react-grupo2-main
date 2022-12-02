import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const ProductCreate = () => {
    const  [product, setProduct] = useState({});

    const navegacion = useNavigate();

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type ==="checkbox" ? target.checked : target.value;
        const name = target.id;
        setProduct((productCurrent) => ({...productCurrent, [name]: value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity() === true) {

            clientHttp.post(`/Producto`, product).then((response) => {
                navegacion(`/admin/products`);
            });
        }
    };

    const saveNotify = () => toast("Producto Creado Exitosamente");
    return (
        <form className="row" onSubmit={(e) => handleSubmit(e)}>
      <div className="col-6">
        <label htmlFor="nombre" className="form-label">
          Nombre del Producto
        </label>
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Ingrese Nombre del Producto"
            onChange={(e) => handleChange(e)}
            required
            maxLength="20"
          />
          <div className="invalid-feedback">Nombre del Producto es obligatoria</div>
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="precio" className="form-label">
          Precio
        </label>
        <div className="input-group has-validation">
          <input
            type="numeric"
            className="form-control"
            id="precio"
            placeholder="Ingrese el Precio"
            onChange={(e) => handleChange(e)}
            required pattern="[0-9]+"
            maxLength="4"
          />
          <div className="invalid-feedback">Precio es obligatorio</div>
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="observaciones" className="form-label">
          Descripcion
        </label>
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-control"
            id="observaciones"
            placeholder="Ingrese descricpion"
            onChange={(e) => handleChange(e)}
            required
            maxLength="80"
          />
          <div className="invalid-feedback">Descripcion es obligatorio</div>
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="caducidad" className="form-label">
          Caducidad
        </label>
        <div className="input-group has-validation">
          <input
            type="date"
            className="form-control"
            id="caducidad"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="marcaId" className="form-label">
          Marca
        </label>
        <select
          className="form-select"
          id="marcaId"
          required
          onChange={(e) => handleChange(e)}
        >
          <option disabled value="">
            Seleccionar Marca
          </option>
          <option value="01">Pronaca</option>
          <option value="02">La Europea</option>
          <option value="03">Juris</option>
        </select>
        <div className="invalid-feedback">Marca es requerido</div>
      </div>

      <div className="col-6">
        <label htmlFor="tipoProductoId" className="form-label">
          Tipo de Producto
        </label>
        <select
          className="form-select"
          id="tipoProductoId"
          required
          onChange={(e) => handleChange(e)}
        >
          <option disabled value="">
            Seleccionar Tipo Producto
          </option>
          <option value="01">Carnico</option>
          <option value="02">Bebidas</option>
          <option value="03">Limpieza</option>
        </select>
        <div className="invalid-feedback">Marca es requerido</div>
      </div>

      <div className="col-12 mt-3">
        <Button
          className="btn btn-secondary"
          type="button"
          onClick={(e) => navegacion(`/admin/products`)}
        >
          Atras
        </Button>{" "}
        <Button
          className="btn btn-primary ms-3"
          variant="success"
          type="submit"
          onClick={saveNotify}
        >
          Guardar
        </Button>{" "}
      </div>
    </form>
  );
};

export const ProductEdit = () => {
  const [product, setProduct] = useState({});
  const [productMarca, setProductMarca] = useState([]);
  const [productTipo, setProductTipo] = useState([]);

  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  const navegacion = useNavigate();

  useEffect(() => {
    clientHttp.get(`/Producto/${productId}`).then((response) => {
        setProduct(response.data)
        setLoading(false);
    });
  }, []);

  useEffect (() => {
    clientHttp.get(`/Marca`).then((response) => {
        setProductMarca(response.data);
    });
  }, []);
  useEffect (() =>{
    clientHttp.get(`/TipoProducto`).then((response) =>{
        setProductTipo(response.data);
    });
  }, []);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.id;
    setProduct((productCurrent) => ({...productCurrent, [name]: value}));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(event.target.checkValidity() === true) {
        clientHttp.put(`/Producto/?id=${productId}`, product).then((response) =>{
            navegacion(`/admin/products`);
        });
    }
  };
  
  const handleDelete = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === true) {
        //console.log("Enviar...");
        //console.log(client);
        clientHttp.delete(`/Producto/?id=${productId}`, product).then((response) =>{
            navegacion(`/admin/products`);
        });
    }
  };
  const { nombre, precio, observaciones, caducidad, marcaId, tipoProductoId} =
   product;

   const saveNotify = () => toast("Datos Guardados.");
  const deleteNotify = () => toast("Producto Eliminado.");
  return loading ? (
    <div>Loading data...</div>
  ) : (
    <>
      <form className="row" onSubmit={(e) => handleSubmit(e)}>
        <div className="col-6">
          <label htmlFor="nombre" className="form-label">
            Nombre del Producto
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => handleChange(e)}
              required
              maxLength="30"
            />
            <div className="invalid-feedback">
              Nombre es obligatorio
            </div>
          </div>
        </div>

        <div className="col-6">
          <label htmlFor="precio" className="form-label">
            Precio
          </label>
          <div className="input-group has-validation">
            <input
              type="number"
              className="form-control"
              id="precio"
              value={precio}
              onChange={(e) => handleChange(e)}
              required pattern="[0-9]+"
              maxLength="4"
            />
            <div className="invalid-feedback">Precio es obligatorio</div>
          </div>
        </div>

        <div className="col-6">
          <label htmlFor="observaciones" className="form-label">
            Observaciones
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              className="form-control"
              id="observaciones"
              value={observaciones == null ? "" : observaciones}
              onChange={(e) => handleChange(e)}
              required
              maxLength="80"
            />
            <div className="invalid-feedback">Apellidos es obligatorio</div>
          </div>
        </div>

        <div className="col-6">
          <label htmlFor="caducidad" className="form-label">
            Fecha de Caducidad{" "}
          </label>
          <div className="input-group has-validation">
            <input
              type="date"
              min={caducidad}
              className="form-control"
              id="caducidad"
              value={caducidad == null ? "" : caducidad}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className="col-6">
          <label htmlFor="marcaId" className="form-label">
            Marca
          </label>
          <select
            className="form-select"
            id="marcaId"
            value={marcaId}
            required
            onChange={(e) => handleChange(e)}
          >
            <option disabled value="">
              Seleccionar Marca
            </option>
            {productMarca.map((prot) => (
              <option key={prot.id} value={prot.id}>
                {prot.nombre}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">Marca es requerido</div>
        </div>

        <div className="col-6">
          <label htmlFor="tipoProductoId" className="form-label">
            Tipo de Producto
          </label>
          <select
            className="form-select"
            id="tipoProductoId"
            value={tipoProductoId}
            required
            onChange={(e) => handleChange(e)}
          >
            <option disabled value="">
              Seleccionar Tipo de Producto
            </option>
            {productTipo.map((proti) => (
              <option key={proti.id} value={proti.id}>
                {proti.nombre}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">El tipo de producto es requerido</div>
        </div>

        <div className="col-12 mt-3">
          <Button
            className="btn btn-secondary"
            type="button"
            onClick={(e) => navegacion(`/admin/products`)}
          >
            Atras
          </Button>{" "}
          <Button
            className="btn btn-primary ms-3"
            variant="success"
            type="submit"
            onClick={saveNotify}
          >
            Guardar
          </Button>{" "}
        </div>
      </form>
      <div align="right" className="col-12 mt-3">
        <form className="col-12 mt-3" onSubmit={(e) => handleDelete(e)}>
          <Button
            type="submit"
            className="btn btn-primary ms-3"
            variant="danger"
            onClick={deleteNotify}
          >
            Eliminar Producto
          </Button>
        </form>
      </div>
    </>
  );
};

const ProductList = (producto) => {
  const [products, setProducts] = useState([]);
  const navegacion = useNavigate();
  useEffect(() => {
    clientHttp.get(`/Producto`).then((response) => {
      //console.log(response);
      setProducts(response.data.lista);
    });
  }, []);
  const handlerEditar = (product) => {
    navegacion(`/admin/products/${product.id}`);
  };
  const handlerCrear = () => {
    navegacion(`/admin/products/Nuevo-Producto`);
  };
  return (
    <>
    <div className="col-6">
        <Button variant="success" onClick={(e) => handlerCrear(e)}>
          Crear Producto
        </Button>{" "}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Observaciones</th>
            <th>Proveedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((pro) => (
            <tr key={pro.id}>
              <td>{pro.nombre}</td>
              <td>{pro.precio}</td>
              <td>{pro.observaciones}</td>
              <td>{pro.marca}</td>
              <td>
                <Button onClick={(e) => handlerEditar(pro)}>Editar</Button>
              </td>
            </tr>
          ))}
        </tbody>
        <div>
            <ToastContainer/>
        </div>
      </table>
    </>
  );
};

export default function ProductAdmin() {
  return <ProductList />;
}
