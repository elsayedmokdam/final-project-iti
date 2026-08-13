import { useEffect, useState } from "react";
import { Link } from "react-router";

import { $Services } from "../../services/services-repository";
import { $Utilities } from "../../utilities/utilities-repository";
import formatPrice from "../../utilities/helpers/formatPrice";
import IsLoading from "../../components/shared-components/is-loading/IsLoading.jsx";
import OrderSummary from "../../components/order-summary/OrderSummary.jsx";
import CartItem from "../../components/cart-item/CartItem.jsx";
import IsEmptyCart from "../../components/is-empty-cart/IsEmptyCart.jsx";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const token = localStorage.getItem("e-commerce-token") || null;

  async function getCart() {
    try {
      setIsLoading(true);
      const response = await $Services.CART_REPOSITORY.getLoggedUserCart();
      setCart(response?.data || null);
    } catch (error) {
      $Utilities.Alerts.displayError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    token ? getCart() : setIsLoading(false);
  }, []);

  async function updateQuantity(productId, count) {
    console.log("productId", productId);
  }

  async function removeProduct(productId) {
    console.log("productId", productId);
  }
  
  // const products = cart?.products || [];
  const products = []
  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : products.length === 0 ? (
        <IsEmptyCart />
      ) : (
        <main
          className="min-vh-100 py-4 py-md-5"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          <div className="container">
            <div className="mb-4">
              <h1 className="fw-bold mb-2">Shopping Cart</h1>

              <p className="mb-0" style={{ color: "var(--text-secondary)" }}>
                {cart?.numOfCartItems || products.length}{" "}
                {products.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
            <div className="row g-4">
              <div className="col-lg-8">
                <div
                  className="card border-0"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderRadius: "var(--radius-xl)",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <div className="card-body p-3 p-md-4">
                    {products.map((item) => {
                      const product = item.product;
                      const productId = product._id || product.id;
                      const isUpdating = loadingProductId === productId;
                      return (
                        <CartItem
                          key={productId}
                          item={item}
                          product={product}
                          isUpdating={isUpdating}
                          updateQuantity={updateQuantity}
                          removeProduct={removeProduct}
                          setLoadingProductId={setLoadingProductId}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="mt-3">
                  <Link
                    to="/products"
                    className="text-decoration-none fw-semibold"
                    style={{
                      color: "var(--primary)",
                    }}
                  >
                    <span className="me-2">←</span>
                    Continue Shopping
                  </Link>
                </div>
              </div>

              <div className="col-lg-4">
                <OrderSummary cart={cart} />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
