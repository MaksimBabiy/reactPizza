import React from "react";
import "./PizzaBlock.scss";
import { useDispatch, useSelector } from "react-redux";
import { addItem, CartItem } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";

type PizzaType = {
  item: CartItem;
  id: string;
  name: string;
  imageUrl: string;
  types: number[];
  sizes: number[];
  price: number;
};

const PizzaBlock: React.FC<PizzaType> = ({
  item,
  id,
  name,
  imageUrl,
  types,
  sizes,
  price,
}) => {
  const [activeSize, setActiveSize] = React.useState<number>(0);
  const [activeType, setActiveType] = React.useState<number>(0);
  const dispach = useDispatch();
  const count = useSelector((state: RootState) =>
    state.cart.cartItems
      .filter((obj) => obj.name === name)
      .reduce((sum, item) => {
        return sum + item.count;
      }, 0)
  );

  return (
    <div className="pizza-block__wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          {" "}
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{name}</h4>
        </Link>

        <div className="pizza-block__selector">
          <ul>
            {types &&
              types.map((item, i) => {
                return (
                  <li
                    key={i}
                    className={activeType === i ? "active" : ""}
                    onClick={() => setActiveType(i)}
                  >
                    {item === 0 ? "тонкое" : "традиционное"}
                  </li>
                );
              })}
          </ul>
          <ul>
            {sizes &&
              sizes.map((item, i) => {
                return (
                  <li
                    key={i}
                    className={activeSize === i ? "active" : ""}
                    onClick={() => setActiveSize(i)}
                  >
                    {item} см.
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₴</div>
          <div
            className="button button--outline button--add"
            onClick={() =>
              dispach(addItem({ ...item, activeSize, activeType }))
            }
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{count && count}</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
