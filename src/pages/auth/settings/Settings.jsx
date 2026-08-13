import { useEffect, useState } from "react";
import { Link } from "react-router";
import ChangePassword from "../../../components/change-passowrd/ChangePassword";
import UpdateUserData from "../../../components/update-user-data/UpdateUserData";
import Appearance from "../../../components/appearance/Appearance";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

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

  return (
    <main
      className="min-vh-100 py-5"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="container">
        <div className="mb-4">
          <h1 className="h2 fw-bold mb-2">Settings</h1>

          <p
            className="mb-0"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Manage your account information, security, and appearance.
          </p>
        </div>

        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-12 col-lg-3">
            <div
              className="card border-0 shadow-sm"
              style={{
                backgroundColor: "var(--surface)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <div className="card-body p-2">
                {/* Profile */}
                <button
                  type="button"
                  onClick={() => setActiveTab("profile")}
                  className="btn w-100 text-start d-flex align-items-center gap-3 px-3 py-3"
                  style={{
                    color:
                      activeTab === "profile"
                        ? "var(--primary)"
                        : "var(--text-secondary)",

                    backgroundColor:
                      activeTab === "profile"
                        ? "var(--primary-light)"
                        : "transparent",

                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <i className="fa-solid fa-user"></i>

                  <div>
                    <div className="fw-semibold">Profile Information</div>

                    <small
                      style={{
                        color: "var(--text-muted)",
                      }}
                    >
                      Update your account
                    </small>
                  </div>
                </button>

                {/* Password */}
                <button
                  type="button"
                  onClick={() => setActiveTab("password")}
                  className="btn w-100 text-start d-flex align-items-center gap-3 px-3 py-3 mt-1"
                  style={{
                    color:
                      activeTab === "password"
                        ? "var(--primary)"
                        : "var(--text-secondary)",

                    backgroundColor:
                      activeTab === "password"
                        ? "var(--primary-light)"
                        : "transparent",

                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <i className="fa-solid fa-lock"></i>

                  <div>
                    <div className="fw-semibold">Password & Security</div>

                    <small
                      style={{
                        color: "var(--text-muted)",
                      }}
                    >
                      Change your password
                    </small>
                  </div>
                </button>

                {/* Appearance */}
                <button
                  type="button"
                  onClick={() => setActiveTab("appearance")}
                  className="btn w-100 text-start d-flex align-items-center gap-3 px-3 py-3 mt-1"
                  style={{
                    color:
                      activeTab === "appearance"
                        ? "var(--primary)"
                        : "var(--text-secondary)",

                    backgroundColor:
                      activeTab === "appearance"
                        ? "var(--primary-light)"
                        : "transparent",

                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <i className="fa-solid fa-palette"></i>
                  <div>
                    <div className="fw-semibold">Appearance</div>

                    <small
                      style={{
                        color: "var(--text-muted)",
                      }}
                    >
                      Light or dark mode
                    </small>
                  </div>
                </button>

                {/* Back */}
                <div
                  className="border-top mt-2 pt-2"
                  style={{
                    borderColor: "var(--border) !important",
                  }}
                >
                  <Link
                    to="/"
                    className="btn w-100 text-start d-flex align-items-center gap-3 px-3 py-2"
                    style={{
                      color: "var(--text-secondary)",
                    }}
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-9">
            {/* Update Profile Data */}
            {activeTab === "profile" && <UpdateUserData />}

            {/* Change Password */}
            {activeTab === "password" && <ChangePassword />}

            {/* Appearance */}
            {activeTab === "appearance" && <Appearance setTheme={setTheme} />}
          </div>
        </div>
      </div>
    </main>
  );
}
