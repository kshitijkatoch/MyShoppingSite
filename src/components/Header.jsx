import { NavLink } from "react-router-dom";
import ProductContext from "../contexts/ProductContext";
import { useContext } from "react";

export default function Header() {
  const { cart, wishlist } = useContext(ProductContext);
  return (
    <>
      <nav className="navbar">
        <div className="container py-2">
          <NavLink to={"/"} className="text-decoration-none">
            <span className="navbar-brand mb-0 h1 text-secondary fw-bold text-opacity-75">
              MyShoppingSite
            </span>
          </NavLink>

          <div className="position-relative mx-2">
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
            <input
              className="form-control ps-5"
              type="search"
              placeholder="Search"
            />
          </div>

          <div className="d-flex align-items-center">
            <button className="btn btn-secondary rounded-0 px-4">Login</button>
            <a className="bi bi-heart text-secondary fs-4 ps-4 m-0 position-relative">
              <span
                className="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7rem", top: "20%" }}
              >
                {wishlist.length}
              </span>
            </a>
            <a className="bi bi-cart text-secondary fs-4 ps-4 m-0 position-relative">
              <span
                className="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7rem", top: "20%" }}
              >
                {cart.length}
              </span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
