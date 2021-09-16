import * as React from "react";
import { useCart } from "../../hooks/useCart";

interface Props {
  isVisible: boolean;
  toggle: () => void;
}

export const Cart = ({ isVisible, toggle }: Props) => {
  const { data, isLoading, isError } = useCart();

  if (isLoading) {
    return <div className="cart-modal">Loading Cart...</div>;
  }

  if (isError) {
    return <div className="cart-modal">Cart failed to load.</div>;
  }

  const {
    item_count = 0,
    display_item_total,
    included_tax_total,
    display_total
  } = data?.data?.attributes || {};

  return (
    <>
      <button onClick={toggle} style={{ width: "auto" }}>
        <i className="btb bt-shopping-cart" />
      </button>
      {isVisible && (
        <div className="cart-modal">
          <h2>Cart</h2>
          <div>{item_count} items in your cart</div>
          <div>Subtotal: {display_item_total}</div>
          <div>Tax: {included_tax_total}</div>
          <div>Total: {display_total}</div>
        </div>
      )}
      <style jsx>{`
        .cart-modal {
          background-color: white;
          padding: 50px;
          border: 2px grey solid;
          position: absolute;
          top: 150px;
          right: 50px;
        }
      `}</style>
    </>
  );
};
