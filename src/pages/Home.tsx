import React from "react";
import {
  Categories,
  Sort,
  PizzaBlock,
  Skeleton,
  Pagination,
} from "../components";
import { useSelector } from "react-redux";
// import { fetchPizzas } from "../redux/slices/pizzasSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useGetPizzasQuery } from "../redux/slices/pizzaApi";

const Home: React.FC = () => {
  const navigate = useNavigate();
  // const isSearch = React.useRef(false);
  const isMounted = React.useRef<boolean>(false);
  //ReactRedux
  // const dispach = useAppDispatch();
  const {
    activeCategoryIndex,
    sortVector,
    activeSort,
    currentPage,
    searchInputValue,
  } = useSelector((state: RootState) => state.filter);

  // const { items, status } = useSelector((state: any) => state.pizza);
  let category =
    activeCategoryIndex === 0 ? "" : `category=${activeCategoryIndex}`;
  let sortBy = activeSort.property;
  let search = searchInputValue ? `search=${searchInputValue}` : "";
  let sortVectorURL = sortVector ? "asc" : "desc";
  const { data, error, isFetching } = useGetPizzasQuery({
    currentPage,
    category,
    search,
    sortBy,
    sortVectorURL,
  });

  // const FetchData = () => {
  //   dispach(
  //     fetchPizzas({ category, sortBy, search, sortVectorURL, currentPage })
  //   );
  // };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryStr = qs.stringify({
        currentPage,
        category: activeCategoryIndex,
        sortBy,
        sortVector: sortVectorURL,
      });

      navigate(`?${queryStr}`);
    }

    isMounted.current = true;
  }, [sortBy, activeCategoryIndex, currentPage, sortVectorURL, navigate]);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    // FetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortVector, sortBy, category, search, currentPage]);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {error ? (
            <div>Ошибка</div>
          ) : isFetching ? (
            [...new Array(4)].map((_, index) => {
              return <Skeleton key={index} />;
            })
          ) : (
            data.map((item: any) => {
              return <PizzaBlock item={item} key={item.id} {...item} />;
            })
          )}
        </div>
        <Pagination currentPage={currentPage} />
      </div>
    </>
  );
};

export default Home;
