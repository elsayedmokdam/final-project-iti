import React, { useEffect, useState } from "react";

export default function Appearance() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  function handleThemeChange(newTheme) {
    setTheme(newTheme);
  }

  return (
    <div
      className="card border-0 shadow-sm"
      style={{
        backgroundColor: "var(--surface)",
        color: "var(--foreground)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div className="card-body p-4">
        <div className="d-flex align-items-center gap-3 mb-4">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
            }}
          >
            <i className="fa-solid fa-palette"></i>
          </div>

          <div>
            <h2 className="h4 fw-bold mb-1">Appearance</h2>

            <p
              className="mb-0"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Customize how the application looks.
            </p>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-12 col-md-6">
            <button
              type="button"
              onClick={() => handleThemeChange("light")}
              className="btn w-100 text-start p-0"
              style={{
                border:
                  theme === "light"
                    ? "2px solid var(--primary)"
                    : "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "var(--surface)",
                color: "var(--foreground)",
              }}
            >
              <div className="p-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "var(--warning-light)",
                        color: "var(--warning)",
                      }}
                    >
                      <i className="fa-solid fa-sun"></i>
                    </div>

                    <div>
                      <h5 className="fw-semibold mb-1">Light Mode</h5>

                      <small
                        style={{
                          color: "var(--text-muted)",
                        }}
                      >
                        Use light appearance
                      </small>
                    </div>
                  </div>

                  {theme === "light" && (
                    <i
                      className="fa-solid fa-circle-check fa-lg"
                      style={{
                        color: "var(--primary)",
                      }}
                    ></i>
                  )}
                </div>
                <div
                  className="p-3 rounded-3"
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    className="rounded-2 mb-2"
                    style={{
                      height: "10px",
                      width: "60%",
                      backgroundColor: "#172033",
                    }}
                  ></div>

                  <div
                    className="rounded-2"
                    style={{
                      height: "8px",
                      width: "85%",
                      backgroundColor: "#94a3b8",
                    }}
                  ></div>
                </div>
              </div>
            </button>
          </div>

          <div className="col-12 col-md-6">
            <button
              type="button"
              onClick={() => handleThemeChange("dark")}
              className="btn w-100 text-start p-0"
              style={{
                border:
                  theme === "dark"
                    ? "2px solid var(--primary)"
                    : "1px solid var(--border)",

                borderRadius: "var(--radius-lg)",
                backgroundColor: "var(--surface)",
                color: "var(--foreground)",
              }}
            >
              <div className="p-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "var(--primary-light)",
                        color: "var(--primary)",
                      }}
                    >
                      <i className="fa-solid fa-moon"></i>
                    </div>

                    <div>
                      <h5 className="fw-semibold mb-1">Dark Mode</h5>

                      <small
                        style={{
                          color: "var(--text-muted)",
                        }}
                      >
                        Use dark appearance
                      </small>
                    </div>
                  </div>

                  {theme === "dark" && (
                    <i
                      className="fa-solid fa-circle-check fa-lg"
                      style={{
                        color: "var(--primary)",
                      }}
                    ></i>
                  )}
                </div>

                <div
                  className="p-3 rounded-3"
                  style={{
                    backgroundColor: "#0b1120",
                    border: "1px solid #334155",
                  }}
                >
                  <div
                    className="rounded-2 mb-2"
                    style={{
                      height: "10px",
                      width: "60%",
                      backgroundColor: "#e2e8f0",
                    }}
                  ></div>

                  <div
                    className="rounded-2"
                    style={{
                      height: "8px",
                      width: "85%",
                      backgroundColor: "#64748b",
                    }}
                  ></div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
