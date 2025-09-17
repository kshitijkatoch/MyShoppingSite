import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProductContext from "../contexts/ProductContext";

export default function Wishlist() {
  const { cart, wishlist, handleCart, handleWishlist, quantity } =
    useContext(ProductContext);

  const [showDialog, setShowDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <>
        <Header />
        <main className="bg-body-tertiary py-4">
          <section className="container text-center">
            <h3 className="fw-bold">My Wishlist</h3>
            <h4 className="p-5 m-5 opacity-50">No item in wishlist</h4>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-body-tertiary px-5 py-4">
        <section className="container text-center">
          <h3 className="fw-bold">My Wishlist</h3>
          <div className="row">
            {wishlist.map((p) => {
              const inCart = cart.some((item) => item._id === p._id);
              const inWishlist = wishlist.some((item) => item._id === p._id);

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
                        // inCart ? navigate("/cart") : handleCart(p)
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
