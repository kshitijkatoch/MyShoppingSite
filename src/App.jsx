import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import ProductContext from "./contexts/ProductContext";
import { useContext } from "react";

function App() {
  const { categories, loading, error } = useContext(ProductContext);

  return (
    <>
      <Header />
      <main className="bg-body-tertiary p-5">
        <section className="container">
          {loading && <p>Loading...</p>}
          <div className="row">
            {categories?.map((c) => (
              <div className="col-sm">
                <Link to="/products" state={{ selectedCategory: c.name }}>
                  <div
                    key={c._id}
                    className="card text-bg-dark border-0 rounded-0 mb-2"
                  >
                    <img
                      src={c.image}
                      className="card-img"
                      alt="Category Image"
                    />
                    <div className="card-img-overlay d-flex align-items-center justify-content-center p-0">
                      <h5 className="card-title w-100 text-center text-bg-dark fw-light bg-opacity-50 py-1">
                        {c.name}
                      </h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section className="container py-5">
          <img
            src="/assets/banner-image.avif"
            alt="Banner"
            className="img-fluid"
          />
        </section>
      </main>
    </>
  );
}

export default App;
