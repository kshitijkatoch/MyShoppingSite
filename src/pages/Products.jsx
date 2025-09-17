import { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import ProductContext from "../contexts/ProductContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

  const [showDialog, setShowDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory || null;

  const [filter, setFilter] = useState(
    selectedCategory ? [selectedCategory] : []
  );

  useEffect(() => {
    if (selectedCategory) {
      setFilter([selectedCategory]);
      window.history.replaceState({}, document.title);
    }
  }, [selectedCategory]);

  const [sortPrice, setSortPrice] = useState(null);
  const [minRating, setMinRating] = useState(0);

  const navigate = useNavigate();

  const filteredProducts = products
    .filter((p) => filter.length === 0 || filter.includes(p.category))
    .filter((p) => +p.rating >= minRating);

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
                  className="form-range"
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
                  <div className="form-check" key={c._id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={c.name}
                      id={`${c.name}Checkbox`}
                      checked={filter.includes(c.name)}
                      onChange={() => toggleItem(filter, setFilter, c.name)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`${c.name}Checkbox`}
                    >
                      {c.name} clothings
                    </label>
                  </div>
                ))}
              </div>
              {/* Sort By */}
              <div className="py-3">
                <h5 className="fw-bold">Sort By Price</h5>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioPrice"
                    id="lowToHigh"
                    checked={sortPrice === "lowToHigh"}
                    onChange={() => setSortPrice("lowToHigh")}
                  />
                  <label className="form-check-label" htmlFor="lowToHigh">
                    Low to high
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioPrice"
                    id="highToLow"
                    checked={sortPrice === "highToLow"}
                    onChange={() => setSortPrice("highToLow")}
                  />
                  <label className="form-check-label" htmlFor="highToLow">
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
                  (Showing {sortedProducts.length} products)
                </span>
              </h5>
              <section className="container">
                {loading && <p>Loading...</p>}
                <div className="row">
                  {sortedProducts?.map((p) => {
                    const inCart = cart.some((item) => item._id === p._id);
                    const inWishlist = wishlist.some(
                      (item) => item._id === p._id
                    );

                    return (
                      <div className="col-md-3" key={p._id}>
                        <div className="card rounded-0 border-0 mt-4">
                          <div className="position-relative">
                            <Link
                              to={`/products/${p._id}`}
                              className="text-decoration-none"
                            >
                              <img
                                src={p.image}
                                className="card-img-top"
                                alt="Product Image"
                                loading="lazy"
                              />
                            </Link>

                            <i
                              onClick={() => handleWishlist(p)}
                              className={`bi ${
                                inWishlist
                                  ? "bi-heart-fill text-danger"
                                  : "bi-heart text-secondary"
                              } y fs-4 position-absolute`}
                              style={{ top: "15px", right: "15px" }}
                            ></i>
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
                            onClick={() => {
                              if (inCart) {
                                navigate("/cart");
                              } else {
                                setSelectedProduct(p);
                                setShowDialog(true);
                              }
                            }}
                            className={`btn ${
                              inCart ? "btn-secondary" : "btn-primary"
                            } rounded-0`}
                          >
                            {inCart ? "Go" : "Add"} to Cart
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </section>
        {showDialog && (
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Select Size</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowDialog(false);
                      setSelectedSize("");
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex gap-2">
                    {selectedProduct.size.map((size) => (
                      <button
                        key={size}
                        className={`btn ${
                          selectedSize === size
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowDialog(false);
                      setSelectedSize("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    disabled={!selectedSize}
                    onClick={() => {
                      handleCart({
                        ...selectedProduct,
                        selectedSize,
                        quantity,
                      });
                      setShowDialog(false);
                      setSelectedSize("");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
