import React from "react";

export default function OrderSummary({ cart }) {
  return (
    <div
      className="card border-0 sticky-lg-top"
      style={{
        top: "20px",
        backgroundColor: "var(--surface)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div className="card-body p-4">
        <h4 className="fw-bold mb-4">Order Summary</h4>

        <div className="d-flex justify-content-between mb-3">
          <span
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Items
          </span>

          <span className="fw-semibold">{cart?.numOfCartItems}</span>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <span
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Subtotal
          </span>

          <span className="fw-semibold">
            {cart?.totalCartPrice?.toLocaleString()} EGP
          </span>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <span
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Shipping
          </span>

          <span
            className="fw-semibold"
            style={{
              color: "var(--success)",
            }}
          >
            Free
          </span>
        </div>

        <hr
          style={{
            borderColor: "var(--border)",
          }}
        />

        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="fw-bold fs-5">Total</span>

          <span
            className="fw-bold fs-4"
            style={{
              color: "var(--price)",
            }}
          >
            {cart?.totalCartPrice?.toLocaleString()} EGP
          </span>
        </div>

        <button
          type="button"
          className="btn w-100 py-3 fw-semibold"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--text-white)",
            borderRadius: "var(--radius-md)",
          }}
          onClick={() => {
            console.log("proceed to checkout");
          }}
        >
          Proceed to Checkout
          <span className="ms-2">→</span>
        </button>
      </div>
    </div>
  );
}
