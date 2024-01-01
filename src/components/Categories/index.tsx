import React from "react";
import "./Categories.scss";
import { useSelector, useDispatch } from "react-redux";

import { setActiveCategoryIndex } from "../../redux/slices/filterSlice";
import { RootState } from "../../redux/store";
const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC = React.memo(() => {
  //ReactRedux
  const activeCategoryIndex = useSelector(
    (state: RootState) => state.filter.activeCategoryIndex
  );
  const dispach = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={index}
              className={activeCategoryIndex === index ? "active" : ""}
              onClick={() => dispach(setActiveCategoryIndex(index))}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;
