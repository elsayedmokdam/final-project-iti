import React from "react";

export default function NoProductsFound({ searchTerm, setSearchTerm }) {
  return (
    <div
      className="card border-0 text-center py-5"
      style={{
        backgroundColor: "var(--surface)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="card-body py-5">
        <div
          className="d-flex align-items-center justify-content-center mx-auto mb-4 rounded-circle"
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "var(--primary-light)",
            color: "var(--primary)",
          }}
        >
          <i className="fa-solid fa-box-open fa-2x" />
        </div>

        <h3 className="h4 fw-bold mb-2" style={{ color: "var(--foreground)" }}>
          No products found
        </h3>

        <p
          className="mb-4"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          We couldn't find any products matching your search.
        </p>

        {searchTerm && (
          <button
            type="button"
            className="btn btn-primary px-4"
            onClick={() => setSearchTerm("")}
          >
            <i className="fa-solid fa-rotate-left me-2" />
            Clear Search
          </button>
        )}
      </div>
    </div>
  );
}
