import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import image from "../../../assets/images/me.jpg";
import AppButton from "../../../components/shared-components/appbutton/AppButton";
import { $Services } from "../../../services/services-repository";
import { $Utilities } from "../../../utilities/utilities-repository";
import { ImSpinner } from "react-icons/im";

export default function Signin() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (payload) => {
    try {
      const { token, user } = await $Services.AUTH_REPOSITORY.signin(payload);
      localStorage.setItem("e-commerce-token", token);
      localStorage.setItem("user-data", JSON.stringify(user));
      $Utilities.Alerts.displaySuccess("Login successfully!");
      navigate("/");
    } catch (error) {
      $Utilities.Alerts.displayError(error);
    } finally {
      reset();
    }
  };

  return (
    <main
      className="min-vh-100 d-flex align-items-center py-5"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="container w-50 mx-auto">
        <div className="h-100 d-flex align-items-center">
          <div
            className="card w-100 border-0 shadow-lg"
            style={{
              backgroundColor: "var(--surface)",
              color: "var(--foreground)",
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <div className="card-body p-4 p-md-5">
              <div className="mb-4">
                <h1 className="h2 fw-bold mb-2 text-center">Sign In</h1>
                <p
                  className="mb-0 text-center"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  Don't have an account?
                  <Link
                    to="/signup"
                    className="fw-semibold text-decoration-none ms-1"
                    style={{
                      color: "var(--primary)",
                    }}
                  >
                    Create one
                  </Link>
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email Address
                  </label>

                  <div className="input-group">
                    <span
                      className="input-group-text"
                      style={{
                        backgroundColor: "var(--input-background)",
                        borderColor: "var(--input-border)",
                        color: "var(--text-muted)",
                      }}
                    >
                      <i className="fa-solid fa-envelope"></i>
                    </span>

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      {...register("email")}
                    />

                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="small text-decoration-none"
                      style={{
                        color: "var(--primary)",
                      }}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="input-group">
                    <span
                      className="input-group-text"
                      style={{
                        backgroundColor: "var(--input-background)",
                        borderColor: "var(--input-border)",
                        color: "var(--text-muted)",
                      }}
                    >
                      <i className="fa-solid fa-lock"></i>
                    </span>

                    <input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      {...register("password")}
                    />

                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <AppButton
                  type="submit"
                  className="btn btn-primary w-100 fw-semibold py-2"
                  isLoading={isSubmitting}
                >
                  Sign In
                  {isSubmitting ? (
                    <ImSpinner className="ms-2 fa-spin" />
                  ): (
                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  )}
                </AppButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
