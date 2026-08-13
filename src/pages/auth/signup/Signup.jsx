import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AppButton from "../../../components/shared-components/appbutton/AppButton";
import { signupSchemaValidation } from "../../../schemas/validations/auth/signup_schema";
import { $Services } from "../../../services/services-repository";
import { $Utilities } from "../../../utilities/utilities-repository";
import { ImSpinner } from "react-icons/im";

export default function Signup() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    mode: "all",
    resolver: zodResolver(signupSchemaValidation),
  });

  const onSubmit = async (payload) => {
    try {
      const data = await $Services.AUTH_REPOSITORY.signup(payload);

      localStorage.setItem("e-commerce-token", data.token);
      localStorage.setItem("user-data", JSON.stringify(data.user));

      $Utilities.Alerts.displaySuccess(
        "Your account has been created successfully!",
      );
      navigate("/");
      reset();
    } catch (error) {
      $Utilities.Alerts.displayError(error);
    }
  };

  return (
    <main
      className="min-vh-100 w-50 mx-auto d-flex align-items-center py-5"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="container">
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
              <div className="mb-4 text-center">
                <h1 className="h2 fw-bold mb-2">Create Account</h1>
                <p
                  className="mb-0"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  Already have an account?
                  <Link
                    to="/signin"
                    className="fw-semibold text-decoration-none ms-1"
                    style={{
                      color: "var(--primary)",
                    }}
                  >
                    Sign in
                  </Link>
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Full Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    Full Name
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
                      <i className="fa-solid fa-user"></i>
                    </span>

                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      {...register("name")}
                    />

                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name.message}
                      </div>
                    )}
                  </div>
                </div>

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
                      placeholder="name@example.com"
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
                  <label htmlFor="password" className="form-label fw-semibold">
                    Password
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
                      <i className="fa-solid fa-lock"></i>
                    </span>

                    <input
                      id="password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Create a strong password"
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

                {/* Confirm Password */}
                <div className="mb-3">
                  <label
                    htmlFor="rePassword"
                    className="form-label fw-semibold"
                  >
                    Confirm Password
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
                      <i className="fa-solid fa-lock"></i>
                    </span>

                    <input
                      id="rePassword"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                      className={`form-control ${
                        errors.rePassword ? "is-invalid" : ""
                      }`}
                      {...register("rePassword")}
                    />

                    {errors.rePassword && (
                      <div className="invalid-feedback">
                        {errors.rePassword.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Birth Date */}
                <div className="mb-3">
                  <label
                    htmlFor="dateOfBirth"
                    className="form-label fw-semibold"
                  >
                    Date of Birth
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
                      <i className="fa-solid fa-calendar"></i>
                    </span>

                    <input
                      id="dateOfBirth"
                      type="date"
                      className={`form-control ${
                        errors.dateOfBirth ? "is-invalid" : ""
                      }`}
                      {...register("dateOfBirth")}
                    />

                    {errors.dateOfBirth && (
                      <div className="invalid-feedback">
                        {errors.dateOfBirth.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Gender */}
                <div className="mb-4">
                  <label htmlFor="gender" className="form-label fw-semibold">
                    Gender
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
                      <i className="fa-solid fa-venus-mars"></i>
                    </span>

                    <select
                      id="gender"
                      className={`form-select ${
                        errors.gender ? "is-invalid" : ""
                      }`}
                      {...register("gender")}
                    >
                      <option value="">Select a gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>

                    {errors.gender && (
                      <div className="invalid-feedback">
                        {errors.gender.message}
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
                  Create Account
                  {isSubmitting ? (
                    <ImSpinner className="ms-2 fa-spin" />
                  ) : (
                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  )}
                </AppButton>

                {/* Reset */}
                <button
                  type="button"
                  className="btn w-100 mt-2 fw-semibold"
                  onClick={() => reset()}
                  style={{
                    backgroundColor: "var(--surface-secondary)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                  }}
                >
                  Reset
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
