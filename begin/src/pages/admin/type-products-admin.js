import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TypeCreate = ()=>{
  const [type, setType] = useState({});

  const navegacion = useNavigate();

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.id;
    setType((typetCurrent) => ({ ...typetCurrent, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === true) {
      //console.log("Enviar...");
      //console.log(client);
      clientHttp.post(`/TipoProducto`, type).then((response) => {
        navegacion(`/admin/type-products`);
      });
    }
  };
  const saveNotify = () => toast("Tipo de Producto Creado Exitosamente");
  return (
    <form className="row" onSubmit={(e) => handleSubmit(e)}>
      <div className="col-6">
        <label htmlFor="nombre" className="form-label">
          Nombre
        </label>
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Ingrese Identificación"
            onChange={(e) => handleChange(e)}
            required
            maxLength="30"
          />
          <div className="invalid-feedback">Nombre es obligatorio</div>
        </div>
      </div>
      <div className="col-12 mt-3">
        <Button
          className="btn btn-secondary"
          type="button"
          onClick={(e) => navegacion(`/admin/type-products`)}
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

export const TypeEdit = () => {
  const [type, setType] = useState({});

  const [loading, setLoading] = useState(true);
  const { tipoProdcutoId } = useParams();

  const navegacion = useNavigate();

  useEffect(() => {
    clientHttp.get(`/TipoProducto/${tipoProdcutoId }`).then((response) => {
      setType(response.data);
      setLoading(false);
    });
  }, []);
  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.id;
    setType((typeCurrent) => ({ ...typeCurrent, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === true) {
      //console.log("Enviar...");
      //console.log(client);
      clientHttp.put(`/TipoProducto/?id=${tipoProdcutoId }`, type).then((response) => {
        navegacion(`/admin/type-products`);
      });
    }
  };
  const handleDelete = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === true) {
      //console.log("Enviar...");
      //console.log(client);
      clientHttp.delete(`/TipoProducto/?id=${tipoProdcutoId }`, type).then((response) => {
        navegacion(`/admin/type-products`);
      });
    }
  };

  const {nombre} = type;

  const saveNotify = () => toast("Datos Guardados.");
  const deleteNotify = () => toast("Tipo de Producto Eliminado.");

  return loading ? (
    <div>Loading data...</div>
  ) : (
    <>
      <form className="row" onSubmit={(e) => handleSubmit(e)}>
        <div className="col-6">
          <label htmlFor="nombre" className="form-label">
            Nombre
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
              Identificación es obligatoria
            </div>
          </div>
        </div>

        <div className="col-12 mt-3">
          <Button
            className="btn btn-secondary"
            type="button"
            onClick={(e) => navegacion(`/admin/type-products`)}
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
            Eliminar Tipo de Producto
          </Button>
        </form>
      </div>
    </>
  );
};
const TipoProductoList = (tipoProducto) => {
    const [tipo, setTipoProducto] = useState([]);
  
    const navegacion = useNavigate();
    useEffect(() => {
      clientHttp.get(`/TipoProducto`).then((response) => {
        //console.log(response);
        setTipoProducto(response.data.lista);
      });
    }, []);
    const handlerEditar = (tipo) => {
      navegacion(`/admin/type-products/${tipo.id}`);
    };
    const handlerCrear = () => {
      navegacion(`/admin/clients/Nuevo-type`);
    };

  
    return (
      <>
        <div className="col-6">
        <Button variant="success" onClick={(e) => handlerCrear(e)}>
          Crear Tipo de Producto
        </Button>{" "}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tipo.map((tip) => (
              <tr key={tip.id}>
                <td>{tip.nombre}</td>
                <td>
                  <Button onClick={(e) => handlerEditar(tip)}>Editar</Button>
                </td>
              </tr>
            ))}
          </tbody>
          <div>
            <ToastContainer />
          </div>
        </table>
      </>
    );
  };


export default function TypeProductAdmin(){
    return <TipoProductoList/>
}