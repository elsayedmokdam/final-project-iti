import { NavLink, Link, useNavigate } from "react-router";
import avatarFallback from "../../assets/images/avatar-generations_rpge.jpg";

export default function MainNavBar() {
  const userData = JSON.parse(localStorage.getItem("user-data")) || null;
  const navigate = useNavigate();
  
  const linksList = [
    {
      name: "Products",
      to: "/products",
      icon: "fa-solid fa-bag-shopping",
    },
    {
      name: "Settings",
      to: "/settings",
      icon: "fa-solid fa-gear",
    },
    {
      name: "Cart",
      to: "/cart",
      icon: "fa-solid fa-cart-shopping",
    }
  ];

  function handleLogout() {
    localStorage.removeItem("e-commerce-token");
    localStorage.removeItem("user-data");
    navigate("/signin");
  }

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        backgroundColor: "var(--navbar-background)",
        borderBottom: "1px solid var(--navbar-border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="container-fluid px-3 px-lg-5">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2 fw-bold"
          style={{
            color: "var(--primary)",
          }}
        >
          <span
            className="d-flex align-items-center justify-content-center rounded-3 fw-bold text-white"
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "var(--primary)",
            }}
          >
            E
          </span>
          <span className="d-none d-sm-inline">E-Commerce</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {linksList.map((link) => (
              <li className="nav-item mx-lg-1" key={link.name}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-3 ${
                      isActive ? "active" : ""
                    }`
                  }
                  style={({ isActive }) => ({
                    color: isActive
                      ? "var(--primary)"
                      : "var(--navbar-text-muted)",
                    backgroundColor: isActive
                      ? "var(--primary-light)"
                      : "transparent",
                    fontWeight: isActive ? "600" : "500",
                  })}
                >
                  <i className={link.icon}></i>
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          {userData ? (
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <button
                  className="btn d-flex align-items-center gap-1 gap-md-2 rounded-pill px-1 px-md-2 py-1"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    color: "var(--navbar-text)",
                    backgroundColor: "var(--surface-hover)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <img
                    src={avatarFallback}
                    alt="User"
                    width="38"
                    height="38"
                    className="rounded-circle flex-shrink-0"
                    style={{
                      objectFit: "cover",
                      border: "2px solid var(--border-primary)",
                    }}
                  />
                  <span className=" fw-semibold text-truncate">
                    {userData?.name || "User"}
                  </span>
                  <i className="fa-solid fa-chevron-down small ms-1"></i>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 ms-5"
                  style={{
                    backgroundColor: "var(--surface)",
                    boxShadow: "var(--shadow-md)",
                    minWidth: "210px",
                    maxWidth: "calc(100vw - 20px)",
                  }}
                >
                  <li>
                    <div
                      className="px-3 py-2 border-bottom"
                      style={{
                        borderColor: "var(--border)",
                      }}
                    >
                      <div
                        className="fw-semibold text-truncate"
                        style={{
                          color: "var(--foreground)",
                        }}
                      >
                        {userData?.name || "User"}
                      </div>
                      <small
                        className="d-block text-truncate"
                        style={{
                          color: "var(--text-muted)",
                        }}
                      >
                        {userData?.email || ""}
                      </small>
                    </div>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="dropdown-item d-flex align-items-center gap-2 py-2"
                      style={{
                        color: "var(--foreground)",
                      }}
                    >
                      <i className="fa-solid fa-gear"></i>
                      <span>Settings</span>
                    </Link>
                  </li>
                  <li>
                    <hr
                      className="dropdown-divider"
                      style={{
                        borderColor: "var(--border)",
                      }}
                    />
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item d-flex align-items-center gap-2 py-2"
                      onClick={handleLogout}
                      style={{
                        color: "var(--danger)",
                      }}
                    >
                      <i className="fa-solid fa-right-from-bracket"></i>
                      <span>Log Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <Link to="/signin" className="btn btn-primary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-outline-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
