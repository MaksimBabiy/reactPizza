import React from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { setSearchInputValue } from "../../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const Search: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const dispach = useDispatch();
  const searchInputValue = useSelector(
    (state: RootState) => state.filter.searchInputValue
  );

  React.useEffect(() => {
    setValue(searchInputValue);
  }, [searchInputValue]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispach(setSearchInputValue(str));
    }, 500),
    []
  );

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
          id="XMLID_223_"
        />
      </svg>
      <input
        value={value}
        onChange={(e) => onChangeInput(e)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
    </div>
  );
};

export default Search;
