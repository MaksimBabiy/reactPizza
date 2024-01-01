import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Property {
  RATING = "rating",
  PRICE = "price",
  NAME = "name",
}
export type ActiveSortType = {
  name: string;
  property: Property;
};

export interface FilterSliceState {
  activeCategoryIndex: number;
  activeSort: ActiveSortType;
  sortVector: boolean;
  currentPage: number;
  searchInputValue: string;
}

const initialState: FilterSliceState = {
  activeCategoryIndex: 0,
  activeSort: { name: "популярности", property: Property.RATING },
  sortVector: false,
  currentPage: 1,
  searchInputValue: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategoryIndex: (state, action: PayloadAction<number>) => {
      state.activeCategoryIndex = action.payload;
      state.currentPage = 1;
    },
    setActiveSort: (state, action: PayloadAction<ActiveSortType>) => {
      state.activeSort = action.payload;
    },
    setSortVector: (state, action) => {
      state.sortVector = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchInputValue: (state, action) => {
      state.searchInputValue = action.payload;
    },
  },
});

export const {
  setActiveCategoryIndex,
  setActiveSort,
  setSortVector,
  setCurrentPage,
  setSearchInputValue,
} = filterSlice.actions;

export default filterSlice.reducer;
