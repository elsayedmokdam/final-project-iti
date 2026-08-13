import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import AppButton from "../shared-components/appbutton/AppButton";
import { updateUserDataValidationSchema } from "../../schemas/validations/auth/update_user_data_schema";
import { $Utilities } from "../../utilities/utilities-repository";
import { $Services } from "../../services/services-repository";
import { ImSpinner } from "react-icons/im";

export default function UpdateUserData() {
  const profileData = localStorage.getItem("profileData") || null;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    mode: "all",
    resolver: zodResolver(updateUserDataValidationSchema),
  });
  async function handleProfileSubmit(data) {
    try {
      await $Services.AUTH_REPOSITORY.updateUserData({
        name: data.name,
        email: data.email,
      });

      $Utilities.Alerts.displaySuccess("Profile updated successfully!");
      localStorage.setItem("user-data", JSON.stringify(data));
      reset();
    } catch (error) {
      $Utilities.Alerts.displayError(error);
    }
  }
  return (
    <div
      className="card border-0 shadow-sm"
      style={{
        backgroundColor: "var(--surface)",
        borderRadius: "var(--radius-xl)",
        color: "var(--foreground)",
      }}
    >
      <div className="card-body p-4 p-md-5">
        <div className="mb-4 d-flex flex-column align-items-center">
          <div
            className="d-flex align-items-center justify-content-center rounded-3 mb-3"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
            }}
          >
            <i className="fa-solid fa-user-pen"></i>
          </div>
          <h2 className="h4 fw-bold mb-2">Profile Information</h2>
          <p
            className="mb-0"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Update your personal information.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleProfileSubmit)}>
          <div className="row g-3" >
            {/* Name */}
            <div className="col-12">
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
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  {...register("name")}
                />
              </div>
            </div>

            {/* Email */}
            <div className="col-12">
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
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  {...register("email")}
                />
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
                Update
              </AppButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
