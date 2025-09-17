import { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ProductContext from "../contexts/ProductContext";

export default function Cart() {
  const { cart, setCart, wishlist, handleWishlist, updateQuantity } =
    useContext(ProductContext);

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <main className="bg-body-tertiary py-4">
          <section className="container text-center">
            <h3 className="fw-bold">My Cart</h3>
            <h4 className="p-5 m-5 opacity-50">No item in Cart</h4>
          </section>
        </main>
      </>
    );
  }

  const totalPrice = cart.reduce((s, p) => s + p.price * p.quantity, 0);
  const discount = 1000;
  const deliveryCharges = 499;
  const totalAmount = totalPrice + deliveryCharges - discount;

  return (
    <>
      <Header />
      <main className="bg-body-tertiary px-5 py-4">
        <section className="container">
          <h3 className="fw-bold text-center">My Cart ({cart.length})</h3>
          <div className="row w-100">
            {/* Left */}
            <div className="col-md-7">
              {/* Products */}
              <div className="d-flex flex-column">
                {cart.map((p) => {
                  const inCart = cart.some((item) => item._id === p._id);
                  const inWishlist = wishlist.some(
                    (item) => item._id === p._id
                  );
                  console.log(p);

                  return (
                    <div className="col" key={p._id}>
                      <div className="card rounded-0 border-0 mt-4">
                        <div className="row">
                          <div class="col-md-5 p-0">
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
                          </div>

                          <div class="col-md-7 ps-0">
                            <div className="card-body border-start p-4 h-100">
                              {/* Name */}
                              <h5 className="fw-normal">
                                {p.brand} {p.name} {p.titleExtension}
                              </h5>
                              {/* Price */}
                              <h3 className="h3 fw-bold py-0">
                                ₹{p.price}{" "}
                                <span className="opacity-50 h5 fw-normal text-decoration-line-through">
                                  ₹{p.price * 2 + 1}
                                </span>{" "}
                              </h3>
                              <h5 className="h5 fw-bold py-1 text-secondary">
                                50% off
                              </h5>
                              {/* Quantity */}
                              <div className="py-0 d-flex align-items-center gap-3">
                                <p className="fs-6 fw-medium">Quantity: </p>
                                <div className="input-group mb-3 w-50">
                                  <button
                                    className="btn btn-outline-secondary rounded-0"
                                    type="button"
                                    id="quantityMinus"
                                    onClick={() =>
                                      updateQuantity(p._id, p.quantity - 1)
                                    }
                                    disabled={p.quantity <= 1}
                                  >
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    className="form-control text-center"
                                    value={p.quantity}
                                    min={1}
                                    max={10}
                                    onChange={(e) => {
                                      let val = Number(e.target.value);
                                      if (val < 0) val = 0;
                                      if (val > 10) val = 10;
                                      updateQuantity(p._id, val);
                                    }}
                                  />
                                  <button
                                    className="btn btn-outline-secondary rounded-0"
                                    type="button"
                                    id="quantityPlus"
                                    onClick={() =>
                                      updateQuantity(p._id, p.quantity + 1)
                                    }
                                    disabled={p.quantity >= 10}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  setCart(cart.filter((i) => i._id !== p._id))
                                }
                                className={`btn btn-secondary rounded-0 w-100`}
                              >
                                Remove From Cart
                              </button>
                              <Link to={"/wishlist"}>
                                <button
                                  className={`btn btn-outline-secondary rounded-0 w-100 mt-2`}
                                >
                                  Go to Wishlist
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Right - Bills */}
            <div className="col-md-5 pt-4">
              <section className="container bg-white p-4">
                <h5 className="fw-bold text-uppercase">Price details</h5>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-5 fw-normal">
                    Price ({cart.length} {cart.length === 1 ? "item" : "items"})
                  </p>
                  <p className="fs-5 fw-normal">₹{totalPrice}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="fs-5 fw-normal">Discount</p>
                  <p className="fs-5 fw-normal">-₹{discount}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="fs-5 fw-normal m-0">Delivery Charges</p>
                  <p className="fs-5 fw-normal m-0">₹{deliveryCharges}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold text-uppercase m-0">Total Amount</h5>
                  <h5 className="fw-bold m-0">₹{totalAmount}</h5>
                </div>
                <hr />
                <p className="fs-5 fw-normal">
                  You will save ₹{discount} on this order
                </p>
                <button className="btn btn-primary rounded-0 w-100 text-uppercase">
                  Place Order
                </button>
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
