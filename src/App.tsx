import React from "react";
import Loadable from "react-loadable";
import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
  loading: () => <div>Loading...</div>,
});
const PizzaPage = Loadable({
  loader: () => import(/* webpackChunkName: "PizzaPage" */ "./pages/PizzaPage"),
  loading: () => <div>Loading...</div>,
});
const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"),
  loading: () => <div>Loading...</div>,
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/pizza/:id" element={<PizzaPage />} />
      </Route>
    </Routes>
  );
}

export default App;
