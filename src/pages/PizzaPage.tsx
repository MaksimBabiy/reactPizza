import React from "react";
// import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetPizzaQuery } from "../redux/slices/pizzaApi";
// import { fetchPizza } from "../redux/slices/pizzasSlice";
// import { RootState, useAppDispatch } from "../redux/store";

const PizzaPage: React.FC = () => {
  const { id } = useParams();
  // const dispach = useAppDispatch();
  // const { currentItem } = useSelector((state: RootState) => state.pizza);
  const { data, isLoading } = useGetPizzaQuery(id as string);
  // React.useEffect(() => {
  //   dispach(fetchPizza(id as string));
  //   return () => {};
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Pizza page</h1>
      <img src={data.imageUrl} alt="url" />
      <p>{data.name}</p>
    </div>
  );
};

export default PizzaPage;
