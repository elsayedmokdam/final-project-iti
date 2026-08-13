import * as zod from "zod";

export const changePasswordSchemaValidation = zod
  .object({
    currentPassword: zod.string().nonempty("Current password is required"),
    password: zod
      .string()
      .nonempty("New Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be less than 20 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    rePassword: zod.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    error: "Confirm password does not match new password",
    path: ["rePassword"],
  });