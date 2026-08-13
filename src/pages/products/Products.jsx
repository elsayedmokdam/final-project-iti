import React, { useEffect, useState } from "react";
import { $Services } from "../../services/services-repository";
import ProductCard from "../../components/product-card/ProductCard";
import IsLoading from "../../components/shared-components/is-loading/IsLoading.jsx";
import NoProductsFound from "../../components/no-products-found/NoProductsFound.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  
  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await $Services.PRODUCTS_REPOSITORY.getAllProducts();
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main
      className="min-vh-100 py-4 py-md-5"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
          <div>
            <p
              className="mb-2 fw-semibold small text-uppercase"
              style={{
                color: "var(--primary)",
                letterSpacing: "1px",
              }}
            >
              Our Collection
            </p>
            <h1 className="display-6 fw-bold mb-2">Products</h1>
            <p
              className="mb-0"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Discover our latest products and find what you need.
            </p>
          </div>
        </div>

        <div
          className="card border-0 mb-4"
          style={{
            backgroundColor: "var(--surface)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div className="card-body p-3 p-md-4">
            <div className="row align-items-center g-3">
              <div className="col-12 col-md-8 col-lg-9">
                <div className="input-group">
                  <span
                    className="input-group-text border-end-0"
                    style={{
                      backgroundColor: "var(--input-background)",
                      borderColor: "var(--input-border)",
                      color: "var(--text-muted)",
                    }}
                  >
                    <i className="fa-solid fa-magnifying-glass" />
                  </span>

                  <input
                    type="search"
                    value={searchTerm}
                    placeholder="Search products..."
                    
                    className="form-control border-start-0"
                    style={{
                      backgroundColor: "var(--input-background)",
                      borderColor: "var(--input-border)",
                      color: "var(--foreground)",
                    }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-12 col-md-4 col-lg-3">
                <div
                  className="d-flex justify-content-md-end align-items-center"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  <span className="small">
                    Showing{" "}
                    <strong
                      style={{
                        color: "var(--foreground)",
                      }}
                    >
                      {filteredProducts.length}
                    </strong>{" "}
                    results
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <IsLoading />
        ) : filteredProducts.length === 0 ? (
          <NoProductsFound searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        ) : (
          <div className="row g-3 g-md-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="col-12 col-sm-6 col-lg-4 col-xl-3"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
