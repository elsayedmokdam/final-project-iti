import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import AppButton from "../../../components/shared-components/appbutton/AppButton";
import { $Services } from "../../../services/services-repository";
import { ImSpinner } from "react-icons/im";
import { $Utilities } from "../../../utilities/utilities-repository";

export default function ForgotPassword() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "all",
  });

  async function onSubmit(data) {
    try {
        const { statusMsg } = await $Services.AUTH_REPOSITORY.forgetPassword(data);
        $Utilities.Alerts.displaySuccess(statusMsg);
        navigate("/verify-reset-code");
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
                    <i className="fa-solid fa-key fa-xl"></i>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h1 className="h3 fw-bold mb-2">Forgot Password?</h1>
                  <p
                    className="mb-0 small"
                    style={{
                      color: "var(--text-secondary)",
                    }}
                  >
                    Don't worry! Enter your email address and we'll send you a
                    link to reset your password.
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Email */}
                  <div className="mb-4">
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
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Please enter a valid email",
                          },
                        })}
                      />

                      {errors.email && (
                        <div className="invalid-feedback">
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <AppButton
                    type="submit"
                    className="btn btn-primary w-100 fw-semibold py-2"
                  >
                    Send Reset Link
                    {isSubmitting ? (
                      <ImSpinner className="ms-2 fa-spin" />
                    ) : (
                      <i className="fa-solid fa-arrow-right ms-2"></i>
                    )}
                  </AppButton>
                </form>

                {/* Back to Sign In */}
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
