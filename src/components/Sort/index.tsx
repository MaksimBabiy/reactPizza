import React from "react";
import "./Sort.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  ActiveSortType,
  Property,
  setActiveSort,
  setSortVector,
} from "../../redux/slices/filterSlice";
import { RootState } from "../../redux/store";

export const sort: ActiveSortType[] = [
  { name: "популярности", property: Property.RATING },
  { name: "цене", property: Property.PRICE },
  { name: "алфавиту", property: Property.NAME },
];
const Sort: React.FC = React.memo(() => {
  //ReactRedux
  const sortVector = useSelector((state: RootState) => state.filter.sortVector);
  const activeSort = useSelector((state: RootState) => state.filter.activeSort);
  const sortRef = React.useRef<HTMLDivElement>(null);
  const dispach = useDispatch();

  const [popupIsVisible, setPopupIsVisible] = React.useState(false);

  const ChangeSort = (item: ActiveSortType) => {
    dispach(setActiveSort(item));
    setPopupIsVisible(!popupIsVisible);
  };
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const _event = e as MouseEvent & {
        composedPath: Node[];
      };
      return sortRef.current && !_event.composedPath().includes(sortRef.current)
        ? setPopupIsVisible(false)
        : null;
    };
    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          onClick={() => dispach(setSortVector(!sortVector))}
          className={sortVector ? "sortAsc" : "sortDesc"}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setPopupIsVisible(!popupIsVisible)}>
          {activeSort.name}
        </span>
      </div>
      {popupIsVisible && (
        <div className="sort__popup">
          <ul>
            {sort.map((obj, index) => {
              return (
                <li
                  key={index}
                  className={
                    activeSort.property === obj.property ? "active" : ""
                  }
                  onClick={() => ChangeSort(obj)}
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
