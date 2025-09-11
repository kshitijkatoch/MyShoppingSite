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

  // const toggleItem = (list, setList, id) => {
  //   setList((p) =>
  //     p.includes(id) ? p.filter((pid) => pid !== id) : [...p, id]
  //   );
  // };
  const toggleItem = (list, setList, product) => {
    setList((p) =>
      p.some((p) => p._id === product._id)
        ? p.filter((p) => p._id !== product._id)
        : [...p, product]
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        cart,
        wishlist,
        loading: lp || lc,
        error: ep || ec,
        handleCart: (id) => toggleItem(cart, setCart, id),
        handleWishlist: (id) => toggleItem(wishlist, setWishlist, id),
        toggleItem,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
