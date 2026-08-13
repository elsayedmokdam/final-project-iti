import React from "react";

export default function IsLoading() {
  return (
    <main
      className="min-vh-100 py-5"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-center align-items-center py-5">
          <div
            className="spinner-border"
            style={{ color: "var(--primary)" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </main>
  );
}
