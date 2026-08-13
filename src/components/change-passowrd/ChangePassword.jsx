import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchemaValidation } from "../../schemas/validations/auth/change_password_schema";
import AppButton from "../shared-components/appbutton/AppButton";
import { $Utilities } from "../../utilities/utilities-repository";
import { $Services } from "../../services/services-repository";
import { ImSpinner } from "react-icons/im";
import { useNavigate } from "react-router";

export default function ChangePassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    mode: "all",
    resolver: zodResolver(changePasswordSchemaValidation),
  });

  const onSubmit = async (payload) => {
    try {
      await $Services.AUTH_REPOSITORY.changePassword({
        currentPassword: payload.currentPassword,
        password: payload.password,
        rePassword: payload.rePassword,
      });

      $Utilities.Alerts.displaySuccess("Password changed successfully");
      navigate("/signin");
      $Utilities.Alerts.displaySuccess("Please sign in again");
      reset();
    } catch (error) {
      $Utilities.Alerts.displayError(error);
    }
  };

  return (
    <div
      className="card border-0 shadow-sm"
      style={{
        backgroundColor: "var(--surface)",
        color: "var(--foreground)",
        borderRadius: "var(--radius-xl)",
      }}
    >
      <div className="card-body p-4 p-md-5">
        <div className="mb-4 d-flex flex-column align-items-center justify-content-center">
          <div
            className="d-flex align-items-center justify-content-center rounded-3 mb-3"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
            }}
          >
            <i className="fa-solid fa-lock"></i>
          </div>

          <h2 className="h4 fw-bold mb-2">Change Password</h2>

          <p
            className="mb-0"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Keep your account secure by using a strong password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Current Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Current Password
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
                id="currentPassword"
                type="password"
                autoComplete="current-currentPassword"
                placeholder="Enter current currentPassword"
                className={`form-control ${
                  errors.currentPassword ? "is-invalid" : ""
                }`}
                {...register("currentPassword")}
              />

              {errors.currentPassword && (
                <div className="invalid-feedback">
                  {errors.currentPassword.message}
                </div>
              )}
            </div>
          </div>

          {/* New Password */}
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label fw-semibold">
              New Password
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
                <i className="fa-solid fa-key"></i>
              </span>

              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter new password"
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
          <div className="mb-4">
            <label htmlFor="reNewPassword" className="form-label fw-semibold">
              Confirm New Password
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
                <i className="fa-solid fa-shield-halved"></i>
              </span>

              <input
                id="rePassword"
                type="password"
                autoComplete="new-password"
                placeholder="Confirm new password"
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

          {/* Submit */}
          <div>
            <AppButton
              type="submit"
              disabled={!isValid || isSubmitting}
              isLoading={isSubmitting}
              className={`btn btn-primary px-4 py-2 fw-semibold ${
                !isValid || isSubmitting ? "opacity-50" : ""
              }`}
            >
              {isSubmitting ? (
                <ImSpinner className="ms-2 fa-spin" />
              ) : (
                <i className="fa-solid fa-key me-2"></i>
              )}
              Change Password
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  );
}
