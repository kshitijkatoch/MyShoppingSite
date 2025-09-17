import { createContext, useEffect, useState } from "react";
import useFetch from "../useFetch";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const {
    data: products = [],
    loading: lp,
    error: ep,
  } = useFetch("https://my-shopping-site-backend.vercel.app/api/products");

  const {
    data: categories = [],
    loading: lc,
    error: ec,
  } = useFetch("https://my-shopping-site-backend.vercel.app/api/categories");

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const toggleItem = (list, setList, product) => {
    setList((p) =>
      p.some((p) => p._id === product._id)
        ? p.filter((p) => p._id !== product._id)
        : [...p, product]
    );
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        cart,
        setCart,
        wishlist,
        loading: lp || lc,
        error: ep || ec,
        handleCart: (id) => toggleItem(cart, setCart, id),
        handleWishlist: (id) => toggleItem(wishlist, setWishlist, id),
        toggleItem,
        quantity,
        setQuantity,
        updateQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
