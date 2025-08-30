import { useState, useContext } from "react";
import Header from "../components/Header";
import useFetch from "../useFetch";
import ProductContext from "../contexts/ProductContext";
import { Link } from "react-router-dom";

export default function Products() {
  const {
    products,
    categories,
    cart,
    wishlist,
    loading,
    error,
    handleCart,
    handleWishlist,
    toggleItem,
  } = useContext(ProductContext);

  const [filter, setFilter] = useState([]);
  const [sortPrice, setSortPrice] = useState(null);
  const [minRating, setMinRating] = useState(0);

  // const filteredProducts =
  //   filter.length === 0 ? products : products.filter((p) => filter.includes(p.category))

  const filteredProducts = products
    .filter((p) => filter.length === 0 || filter.includes(p.category))
    .filter((p) => +p.rating >= minRating);

  // const ratedProducts = filteredProducts.filter((p) => p.rating >= minRating);

  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sortPrice === "lowToHigh"
      ? a.price - b.price
      : sortPrice === "highToLow"
      ? b.price - a.price
      : 0
  );

  return (
    <>
      <Header />
      <main className="bg-body-tertiary">
        <section className="row w-100">
          {/* Filters */}
          <div className="col-md-3">
            <div className="container bg-white p-4 h-100">
              <h5 className="fw-bold d-flex justify-content-between">
                Filters{" "}
                <span
                  className="btn fw-light"
                  onClick={() => {
                    setFilter([]);
                    setSortPrice(null);
                    setMinRating(0);
                  }}
                >
                  (Clear)
                </span>
              </h5>
              {/* Rating Slider */}
              <div className="py-3">
                <h5 className="fw-bold">Rating</h5>
                <div className="d-flex flex-wrap justify-content-between">
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
                <input
                  type="range"
                  class="form-range"
                  min="0"
                  max="5"
                  value={minRating}
                  id="ratingSlider"
                  onChange={(e) => setMinRating(+e.target.value)}
                />
              </div>
              {/* Category filter */}
              <div className="py-3">
                <h5 className="fw-bold">Categories</h5>
                {categories.map((c) => (
                  <div className="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value={c.name}
                      id={`${c.name}Checkbox`}
                      checked={filter.includes(c.name)}
                      onChange={() => toggleItem(filter, setFilter, c.name)}
                    />
                    <label class="form-check-label" for={`${c.name}Checkbox`}>
                      {c.name} clothings
                    </label>
                  </div>
                ))}
              </div>
              {/* Sort By */}
              <div className="py-3">
                <h5 className="fw-bold">Sort By Price</h5>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="radioPrice"
                    id="lowToHigh"
                    checked={sortPrice === "lowToHigh"}
                    onChange={() => setSortPrice("lowToHigh")}
                  />
                  <label class="form-check-label" for="lowToHigh">
                    Low to high
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="radioPrice"
                    id="highToLow"
                    checked={sortPrice === "highToLow"}
                    onChange={() => setSortPrice("highToLow")}
                  />
                  <label class="form-check-label" for="highToLow">
                    High to low
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* List */}
          <div className="col-md-9">
            <div className="container p-4">
              <h5 className="fw-bold">
                Showing All Products{" "}
                <span className="text-secondary fs-6">
                  (Showing {products.length} products)
                </span>
              </h5>
              <section className="container">
                {loading && <p>Loading...</p>}
                <div className="row">
                  {sortedProducts?.map((p) => (
                    <div className="col-md-3" key={p._id}>
                      {/* <Link to="/products" className="text-decoration-none"> */}
                      <div className="card rounded-0 border-0 mt-4">
                        <div className="position-relative">
                          <img
                            src={p.image}
                            className="card-img-top"
                            alt="Category Image"
                          />

                          <a
                            onClick={() => handleWishlist(p._id)}
                            className={`bi ${
                              wishlist.includes(p._id)
                                ? "bi-heart-fill text-danger"
                                : "bi-heart text-secondary"
                            } y fs-4 position-absolute`}
                            style={{ top: "15px", right: "15px" }}
                          ></a>
                          {/* <a className="bi bi-heart-fill text-danger fs-4"></a> */}
                        </div>

                        <div className="card-body py-2 border-top">
                          <p className="card-text text-center w-100 mb-2">
                            {p.brand} {p.name.slice(0, 11) + "..."}
                          </p>
                          <h5 className="card-title text-center w-100">
                            ₹{p.price}
                          </h5>
                        </div>
                        <button
                          onClick={() => handleCart(p._id)}
                          className={`btn ${
                            cart.includes(p._id)
                              ? "btn-secondary"
                              : "btn-primary"
                          } rounded-0`}
                        >
                          {cart.includes(p._id) ? "Add" : "Go"} to Cart
                        </button>
                      </div>
                      {/* </Link> */}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
