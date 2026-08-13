import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import AppButton from "../../../components/shared-components/appbutton/AppButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordValidationSchema } from "../../../schemas/validations/auth/reset_passwor_schema";
import { $Services } from "../../../services/services-repository";
import { $Utilities } from "../../../utilities/utilities-repository";
import { ImSpinner } from "react-icons/im";

export default function ResetPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(resetPasswordValidationSchema),
    mode: "all",
  });

  async function onSubmit(data) {
    try {
      const { token } = await $Services.AUTH_REPOSITORY.resetPassword(data);
      localStorage.setItem("e-commerce-token", token);
      $Utilities.Alerts.displaySuccess("Password reset successfully!");
      navigate("/signin");
    } catch (error) {
      $Utilities.Alerts.displayError(error);
    }
  }

  return (
    <main
      className="min-vh-100 d-flex align-items-center justify-content-center py-5 px-3"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div
              className="card border-0"
              style={{
                backgroundColor: "var(--surface)",
                color: "var(--foreground)",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center mx-auto rounded-circle"
                    style={{
                      width: "70px",
                      height: "70px",
                      backgroundColor: "var(--primary-light)",
                      color: "var(--primary)",
                    }}
                  >
                    <i className="fa-solid fa-lock-open fa-xl"></i>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h1 className="h3 fw-bold mb-2">Reset Password</h1>
                  <p
                    className="mb-0 small"
                    style={{
                      color: "var(--text-secondary)",
                    }}
                  >
                    Create a new password for your account. Make sure it's
                    strong and secure.
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

                  {/* New Password */}
                  <div className="mb-3">
                    <label
                      htmlFor="newPassword"
                      className="form-label fw-semibold"
                    >
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
                        <i className="fa-solid fa-lock"></i>
                      </span>

                      <input
                        id="newPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Enter new password"
                        className={`form-control ${
                          errors.newPassword ? "is-invalid" : ""
                        }`}
                        {...register("newPassword")}
                      />

                      {errors.newPassword && (
                        <div className="invalid-feedback">
                          {errors.newPassword.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <AppButton
                    type="submit"
                    disabled={!isValid}
                    className={`btn btn-primary w-100 fw-semibold py-2 ${
                      !isValid ? "opacity-50" : ""
                    }`}
                  >
                    Reset Password
                    {isSubmitting ? (
                      <ImSpinner className="ms-2 fa-spin" />
                    ) : (
                      <i className="fa-solid fa-check ms-2"></i>
                    )}
                  </AppButton>
                </form>

                {/* Back */}
                <div className="text-center mt-4">
                  <Link
                    to="/signin"
                    className="text-decoration-none fw-semibold small"
                    style={{
                      color: "var(--primary)",
                    }}
                  >
                    <i className="fa-solid fa-arrow-left me-2"></i>
                    Back to Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
