import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import AppButton from "../../../components/shared-components/appbutton/AppButton";
import { ImSpinner } from "react-icons/im";
import { $Services } from "../../../services/services-repository";
import { $Utilities } from "../../../utilities/utilities-repository";

export default function VerifyResetCode() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      resetCode: "",
    },
    mode: "all",
  });

  async function onSubmit(data) {
    try {
        await $Services.AUTH_REPOSITORY.verifyResetCode(data);
        $Utilities.Alerts.displaySuccess("Reset code verified successfully!");
        navigate("/reset-password");
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
                    <i className="fa-solid fa-shield-halved fa-xl"></i>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h1 className="h3 fw-bold mb-2">Verify Reset Code</h1>
                  <p
                    className="mb-0 small"
                    style={{
                      color: "var(--text-secondary)",
                    }}
                  >
                    Enter the verification code we sent to your email address.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Reset Code */}
                  <div className="mb-4">
                    <label
                      htmlFor="resetCode"
                      className="form-label fw-semibold"
                    >
                      Verification Code
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
                        id="resetCode"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        placeholder="Enter 6-digit code"
                        className={`form-control text-center fw-semibold ${
                          errors.resetCode ? "is-invalid" : ""
                        }`}
                        style={{
                          letterSpacing: "0.35rem",
                        }}
                        {...register("resetCode", {
                          required: "Verification code is required",
                          pattern: {
                            value: /^\d{6}$/,
                            message: "Code must contain exactly 6 digits",
                          },
                        })}
                      />

                      {errors.resetCode && (
                        <div className="invalid-feedback">
                          {errors.resetCode.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <AppButton
                    type="submit"
                    className="btn btn-primary w-100 fw-semibold py-2"
                  >
                    Verify Code
                    {isSubmitting ? (
                      <ImSpinner className="ms-2 fa-spin" />
                    ) : (
                      <i className="fa-solid fa-arrow-right ms-2"></i>
                    )}
                  </AppButton>
                </form>

                {/* Resend */}
                <div className="text-center mt-4">
                  <p
                    className="small mb-2"
                    style={{
                      color: "var(--text-secondary)",
                    }}
                  >
                    Didn't receive the code?
                  </p>

                  <AppButton
                    type="button"
                    className="btn btn-outline-primary w-100 fw-semibold py-2"
                    onClick={() => {}}
                  >
                    Resend Code
                  </AppButton>
                </div>

                {/* Back */}
                <div className="text-center mt-4">
                  <Link
                    to="/forgot-password"
                    className="text-decoration-none fw-semibold small"
                    style={{
                      color: "var(--primary)",
                    }}
                  >
                    <i className="fa-solid fa-arrow-left me-2"></i>
                    Back to Forgot Password
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
