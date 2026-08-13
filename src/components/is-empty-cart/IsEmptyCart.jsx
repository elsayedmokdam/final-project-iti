import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router";

export default function IsEmptyCart() {
  return (
    <main
      className="min-vh-100 py-5"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="container">
        <div
          className="card border-0 text-center py-5"
          style={{
            backgroundColor: "var(--surface)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center mx-auto mb-4 rounded-circle"
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
            }}
          >
            <FaCartShopping size={32} />
          </div>

          <h2 className="fw-bold mb-2" style={{ color: "var(--foreground)" }}>Your Cart is Empty</h2>

          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            You haven't added any products to your cart yet.
          </p>

          <Link
            to="/products"
            className="btn px-4 py-2 fw-semibold w-50 mx-auto"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--text-white)",
              borderRadius: "var(--radius-md)",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
