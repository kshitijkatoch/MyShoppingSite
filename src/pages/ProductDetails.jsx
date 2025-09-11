import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import Header from "../components/Header";
import ProductContext from "../contexts/ProductContext";
import { ToastContainer, toast } from "react-toastify";

export default function ProductDetails() {
  const { products, cart, wishlist, handleWishlist, handleCart } =
    useContext(ProductContext);
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  const { id: productID } = useParams();
  const product = products.find((p) => p._id === productID);

  if (!product) {
    return (
      <>
        <Header />
        <main className="bg-body-tertiary py-4">
          <section className="container bg-white text-center py-5">
            <h4>Loading product...</h4>
          </section>
        </main>
      </>
    );
  }

  const {
    _id,
    image,
    brand,
    name,
    titleExtension,
    rating,
    price,
    size,
    description,
  } = product;

  const inCart = cart.some((p) => p._id === _id);
  const inWishlist = wishlist.some((p) => p._id === _id);

  const notify = () => toast("Pleasse Select Size first.", { theme: "dark" });

  return (
    <>
      <Header />
      <main className="bg-body-tertiary py-4">
        <section className="container bg-white">
          <div className="row">
            {/* Left */}
            <div className="col-md-4">
              <div className="container">
                {/* Card */}
                <div className="card rounded-0 border-0 pt-3">
                  <div className="position-relative">
                    <img
                      src={image}
                      className="card-img-top"
                      alt="Product Image"
                    />
                    <a
                      onClick={() => handleWishlist(product)}
                      className={`bi ${
                        inWishlist
                          ? "bi-heart-fill text-danger"
                          : "bi-heart text-secondary"
                      } fs-4 position-absolute`}
                      style={{ top: "15px", right: "15px" }}
                    ></a>
                  </div>

                  <button className="btn btn-primary rounded-0 mt-3">
                    Buy Now
                  </button>

                  <button
                    onClick={() => {
                      if (!selectedSize) {
                        notify();
                      }
                      handleCart(product);
                    }}
                    className={`btn ${
                      inCart && selectedSize ? "btn-secondary" : "btn-primary"
                    } rounded-0 my-3`}
                  >
                    {inCart && selectedSize ? "Go" : "Add"} to Cart
                  </button>
                  <ToastContainer />
                </div>
              </div>
            </div>
            {/* Right */}
            <div className="col-md-8">
              <div className="container pt-3">
                <h3 className="fw-normal">
                  {brand} {name} {titleExtension}
                </h3>
                {/* Rating */}
                <div className="d-flex gap-2 py-1">
                  <p className="m-0">{rating}</p>
                  <div className="text-warning">
                    {Array.from({ length: 5 }, (_, i) => (
                      <i
                        key={i}
                        className={`bi ${
                          i < Math.round(rating) ? "bi-star-fill" : "bi-star"
                        }`}
                      ></i>
                    ))}
                  </div>
                </div>
                <h3 className="h3 fw-bold py-1">
                  ₹{price}{" "}
                  <span className="opacity-50 h5 fw-normal text-decoration-line-through">
                    ₹{price * 2 + 1}
                  </span>{" "}
                </h3>
                <h5 className="h5 fw-bold py-1 text-secondary">50% off</h5>
                {/* Quantity */}
                <div className="py-1 d-flex align-items-center gap-3">
                  <p className="fs-6 fw-medium">Quantity: </p>
                  <div className="input-group mb-3 w-25">
                    <button
                      className="btn btn-outline-secondary rounded-0"
                      type="button"
                      id="quantityMinus"
                      onClick={() => setQuantity(quantity - 1)}
                      disabled={quantity <= 0}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control text-center"
                      value={quantity}
                      min={0}
                      max={10}
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        if (val < 0) val = 0;
                        if (val > 10) val = 10;
                        setQuantity(val);
                      }}
                    />
                    <button
                      className="btn btn-outline-secondary rounded-0"
                      type="button"
                      id="quantityPlus"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Size */}
                <div className="py-1 d-flex align-items-center gap-3">
                  <p className="fs-6 fw-medium m-0">Size: </p>
                  <div className="btn-group">
                    {size.map((s) => (
                      <div key={s + "size"}>
                        <input
                          type="radio"
                          className="btn-check"
                          name="size"
                          id={s + "-size"}
                          onChange={() => setSelectedSize(s)}
                        />

                        <label
                          className="btn btn-outline-secondary rounded-0 me-2"
                          htmlFor={s + "-size"}
                        >
                          {s}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <hr />
                {/* Description */}
                <div className="py-1">
                  <p className="fs-6 fw-medium m-0">Description: </p>
                  <ul>
                    {description.map((d, i) => (
                      <li className="m-0" key={i}>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
