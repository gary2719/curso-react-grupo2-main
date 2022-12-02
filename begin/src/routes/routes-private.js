//import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../componentes/layout";
import ClientsAdmin, {
  ClientCreate,
  ClientEdit,
} from "../pages/admin/clients-admin";
import ProductAdmin, { ProductCreate, ProductEdit } from "../pages/admin/products-admin";
import TypeProductAdmin, { TypeCreate, TypeEdit } from "../pages/admin/type-products-admin";
export default [
  {
    name: "Administración Productos ",
    key: "products-admin",
    route: "/admin/products",
    component: <ProductAdmin />,
    showLink: true,
  },
  {
    name: "Crear Productos",
    key: "products-create-admin",
    route: "/admin/products/Nuevo-Producto",
    component: <ProductCreate />,
    showLink: false,
  },
  {
    name: "Editar Productos ",
    key: "products-edit-admin",
    route: "/admin/products/:productId",
    component: <ProductEdit />,
    showLink: false,
  },
  {
    name: "Tipos de Productos",
    key: "type-products-admin",
    route: "/admin/type-products",
    component: <TypeProductAdmin />,
    showLink: true,
  },
  {
    name: "Crear Tipo Productos",
    key: "type-create-admin",
    route: "/admin/type-products/Nuevo-type",
    component: <TypeCreate />,
    showLink: false,
  },
  {
    name: "Editar Tipo de productos ",
    key: "type-edit-admin",
    route: "/admin/type-products/:tipoProductoId",
    component: <TypeEdit />,
    showLink: false,
  },
  {
    name: "Clientes",
    key: "clients-admin",
    route: "/admin/clients",
    component: <ClientsAdmin />,
    showLink: true,
  },
  {
    name: "Editar Clientes ",
    key: "clients-edit-admin",
    route: "/admin/clients/:clientId",
    component: <ClientEdit />,
    showLink: false,
  },
  {
    name: "Crear Clientes",
    key: "clients-create-admin",
    route: "/admin/clients/Nuevo-Cliente",
    component: <ClientCreate />,
    showLink: false,
  },
];
